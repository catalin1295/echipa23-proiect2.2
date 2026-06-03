import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArticles, getCategories } from '../services/api';
import ArticleCard from '../components/ui/ArticleCard';

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-slate-700 rounded-xl ${className}`} />;
}

export default function Blog() {
  const [articles,   setArticles]   = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch]   = useState('');
  const activeCategory        = searchParams.get('category') || 'all';

  useEffect(() => {
    Promise.all([getArticles(), getCategories()]).then(([arts], cats) => {
      // Ne asigurăm că primim array-uri valide din API
      setArticles(Array.isArray(arts) ? arts : []);
      setCategories(Array.isArray(cats) ? cats : []);
      setLoading(false);
    }).catch(err => {
      console.error("Eroare la preluarea datelor:", err);
      setLoading(false);
    });
  }, []);

  // Filtrare client-side securizată cu ?.
  const filtered = useMemo(() => {
    return articles.filter(a => {
      if (!a?.attributes) return false; // Ignoră articolele malformate

      const catSlug  = a.attributes.category?.data?.attributes?.slug;
      const matchCat = activeCategory === 'all' || catSlug === activeCategory;
      
      const q        = search.toLowerCase();
      const title    = a.attributes.title?.toLowerCase() || '';
      const excerpt  = (a.attributes.excerpt || '').toLowerCase();
      
      const matchQ   = !q || title.includes(q) || excerpt.includes(q);
      return matchCat && matchQ;
    });
  }, [articles, activeCategory, search]);

  function setCategory(slug) {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  }

  return (
    <>
      {/* ═══ HEADER ═══ */}
      <section className="bg-gray-50 dark:bg-slate-900 py-16 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-widest mb-2">
            Articole
          </p>
          <h1 className="font-heading font-black text-4xl md:text-5xl text-gray-900 dark:text-white mb-3">
            Blog
          </h1>
          <p className="font-accent italic text-gray-400 dark:text-gray-500 text-lg">
            Proiecte, tutoriale și gânduri despre tech
          </p>
        </div>
      </section>

      {/* ═══ SEARCH + FILTRE ═══ */}
      <section className="bg-white dark:bg-slate-950 py-8 border-b border-gray-100 dark:border-slate-800 sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">

          {/* Search input */}
          <div className="relative w-full sm:w-72">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              placeholder="Caută articole..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800
                border border-gray-200 dark:border-slate-700 rounded-xl
                text-sm text-gray-900 dark:text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                transition-colors"
            />
          </div>

          {/* Filtre categorii */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              Toate
            </button>
            {categories.map(cat => {
              // Verificăm dacă structura categoriei este completă
              const slug = cat?.attributes?.slug;
              const name = cat?.attributes?.name;
              
              if (!slug || !name) return null; // Prevenim crăparea dacă datele sunt incomplete

              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(slug)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    activeCategory === slug
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ GRID ARTICOLE ═══ */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">

          {/* Counter rezultate */}
          {!loading && (
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
              {filtered.length === 0
                ? 'Niciun articol găsit.'
                : `${filtered.length} ${filtered.length === 1 ? 'articol' : 'articole'} ${
                    search ? `pentru "${search}"` : ''
                  }`
              }
            </p>
          )}

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-72" />)}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-2">
                Niciun articol găsit
              </h3>
              <p className="text-gray-400 dark:text-gray-500">
                {search
                  ? `Nu există articole care să conțină "${search}".`
                  : 'Nu există articole în această categorie.'}
              </p>
              <button
                onClick={() => { setSearch(''); setCategory('all'); }}
                className="mt-6 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-500 transition-colors"
              >
                Resetează filtrele
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
