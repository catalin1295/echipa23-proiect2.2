import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';

const NAV_LINKS = [
  { path: '/',        label: 'Acasă'   },
  { path: '/blog',    label: 'Blog'    },
  { path: '/about',   label: 'Despre'  },
  { path: '/contact', label: 'Contact' },
];

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, toggleDark]   = useDarkMode();
  const location               = useLocation();

  // Inchide meniu la schimbare de ruta
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Shadow la scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Blocheaza scroll cand meniul e deschis
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const desktopLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
    }`;

  return (
    <>
      {/* ════════════════════════════════════
          NAVBAR STICKY — vizibil pe fiecare pagina
          ════════════════════════════════════ */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-sm'
          : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
      }`}>
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 font-heading font-bold text-xl shrink-0">
            <span className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg
              flex items-center justify-center text-white text-sm font-black">P</span>
            <span className="hidden sm:block text-gray-900 dark:text-white">Portfolio</span>
          </Link>

          {/* ── Link-uri desktop (ascunse pe mobil) ── */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={desktopLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* ── Actiuni dreapta ── */}
          <div className="flex items-center gap-2">
            {/* Buton dark/light mode */}
            <button
              onClick={toggleDark}
              aria-label={isDark ? 'Mod luminos' : 'Mod întunecat'}
              className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800
                text-gray-600 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Buton hamburger — DOAR pe mobil */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Deschide meniu"
              className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-slate-800
                text-gray-600 dark:text-gray-300
                hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ════════════════════════════════════
          BACKDROP (click pentru a inchide)
          ════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* ════════════════════════════════════
          MENIU OFFCANVAS — apare din dreapta pe mobil
          ════════════════════════════════════ */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Meniu navigare"
        className={`fixed top-0 right-0 h-full w-72 z-50
          bg-white dark:bg-slate-900 shadow-2xl
          transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Header offcanvas */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
          <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">
            Navigare
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Închide meniu"
            className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800
              text-gray-600 dark:text-gray-300
              hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Link-uri offcanvas */}
        <nav className="p-4 space-y-1">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer offcanvas */}
        <div className="absolute bottom-0 inset-x-0 p-5 border-t border-gray-100 dark:border-slate-800">
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
            © {new Date().getFullYear()} Portfolio Personal
          </p>
        </div>
      </aside>
    </>
  );
}
