import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug, strapiImageUrl } from '../services/api';

function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-slate-700 rounded-xl ${className}`} />;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('ro-RO', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function ArticlePage() {
  const { slug }              = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    getArticleBySlug(slug).then(data => {
      if (!data) setNotFound(true);
      else setArticle(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="font-heading font-black text-3xl text-gray-900 dark:text-white mb-3">
          Articolul nu a fost găsit
        </h1>
        <p className="text-gray-400 mb-8">
          Articolul cu slug-ul <code className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded">{slug}</code> nu există.
        </p>
        <Link to="/blog" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-colors">
          ← Înapoi la Blog
        </Link>
      </div>
    );
  }

  const { title, publishedAt, category, image, content, excerpt } = article.attributes;
  const catName  = category?.data?.attributes?.name;
  const catSlug  = category?.data?.attributes?.slug;
  const imgUrl   = strapiImageUrl(image);

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Acasă</Link>
        <span>/</span>
        <Link to="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-gray-600 dark:text-gray-300 line-clamp-1">{title}</span>
      </nav>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {catName && (
          <Link
            to={`/blog?category=${catSlug}`}
            className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60
              text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold"
          >
            {catName}
          </Link>
        )}
        <time className="text-sm text-gray-400">{formatDate(publishedAt)}</time>
      </div>

      {/* Titlu */}
      <h1 className="font-heading font-black text-3xl md:text-4xl lg:text-5xl
        text-gray-900 dark:text-white leading-tight mb-5">
        {title}
      </h1>

      {/* Excerpt italic */}
      {excerpt && (
        <p className="font-accent italic text-lg text-gray-500 dark:text-gray-400 border-l-4 border-indigo-400 pl-4 mb-8">
          {excerpt}
        </p>
      )}

      {/* Imagine cover */}
      {imgUrl && (
        <div className="rounded-2xl overflow-hidden mb-10 aspect-video">
          <img src={imgUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Continut articol */}
      <div className="
        prose prose-lg max-w-none dark:prose-invert
        prose-headings:font-heading prose-headings:font-bold
        prose-a:text-indigo-600 dark:prose-a:text-indigo-400
        prose-code:bg-gray-100 dark:prose-code:bg-slate-800
        prose-code:rounded prose-code:px-1.5 prose-code:py-0.5
        prose-pre:bg-gray-100 dark:prose-pre:bg-slate-800
        prose-blockquote:border-l-indigo-400 prose-blockquote:font-accent prose-blockquote:italic
        text-gray-700 dark:text-gray-300
      ">
        {content
          ? content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} className="font-heading font-black text-2xl text-gray-900 dark:text-white mt-8 mb-3">{line.slice(3)}</h2>;
              }
              if (line.startsWith('### ')) {
                return <h3 key={i} className="font-heading font-bold text-xl text-gray-900 dark:text-white mt-6 mb-2">{line.slice(4)}</h3>;
              }
              if (line.startsWith('- ')) {
                return <li key={i} className="ml-6 list-disc">{line.slice(2)}</li>;
              }
              if (line.trim() === '') {
                return <br key={i} />;
              }
              return <p key={i} className="mb-3 leading-relaxed">{line}</p>;
            })
          : <p className="text-gray-400">Conținut indisponibil.</p>
        }
      </div>

      {/* Navigare */}
      <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400
            font-semibold hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          Înapoi la Blog
        </Link>
      </div>
    </article>
  );
}
