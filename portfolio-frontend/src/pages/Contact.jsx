import { useState } from 'react';
import { sendContactForm } from '../services/api';

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form,    setForm]    = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await sendContactForm(form);
      setSuccess(true);
      setForm(INITIAL);
    } catch (err) {
      setError(err.message || 'A apărut o eroare. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ═══ HEADER ═══ */}
      <section className="bg-gray-50 dark:bg-slate-900 py-16 border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-indigo-600 dark:text-indigo-400 text-sm font-bold uppercase tracking-widest mb-2">
            Hai să vorbim
          </p>
          <h1 className="font-heading font-black text-4xl md:text-5xl text-gray-900 dark:text-white mb-3">
            Contact
          </h1>
          <p className="font-accent italic text-gray-400 dark:text-gray-500 text-lg">
            Trimite-mi un mesaj — îți răspund în cel mai scurt timp posibil.
          </p>
        </div>
      </section>

      {/* ═══ CONTINUT ═══ */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-12">

            {/* ── Formular (3/5) ── */}
            <div className="md:col-span-3">
              <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">
                Trimite un mesaj
              </h2>

              {/* Mesaj succes */}
              {success && (
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30
                  border border-emerald-200 dark:border-emerald-800
                  rounded-2xl flex items-start gap-3">
                  <span className="text-emerald-500 text-xl">✅</span>
                  <div>
                    <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                      Mesaj trimis cu succes!
                    </p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      Mulțumesc pentru mesaj. Îți voi răspunde în curând.
                    </p>
                  </div>
                </div>
              )}

              {/* Mesaj eroare */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30
                  border border-red-200 dark:border-red-800
                  rounded-2xl flex items-start gap-3">
                  <span className="text-red-500 text-xl">⚠️</span>
                  <div>
                    <p className="font-semibold text-red-800 dark:text-red-300">Eroare la trimitere</p>
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Rand: Nume + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Nume <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Prenume Nume"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800
                        border border-gray-200 dark:border-slate-700 rounded-xl
                        text-gray-900 dark:text-white placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                        transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="email@exemplu.com"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800
                        border border-gray-200 dark:border-slate-700 rounded-xl
                        text-gray-900 dark:text-white placeholder-gray-400
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                        transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Subiect */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Subiect <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Colaborare / Întrebare / Altele"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800
                      border border-gray-200 dark:border-slate-700 rounded-xl
                      text-gray-900 dark:text-white placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                      transition-colors text-sm"
                  />
                </div>

                {/* Mesaj */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Mesaj <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Scrie mesajul tău aici..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800
                      border border-gray-200 dark:border-slate-700 rounded-xl
                      text-gray-900 dark:text-white placeholder-gray-400
                      focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                      transition-colors text-sm resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60
                    text-white font-bold rounded-xl transition-all
                    hover:-translate-y-0.5 active:scale-95 shadow-md shadow-indigo-500/20"
                >
                  {loading ? 'Se trimite...' : 'Trimite mesajul →'}
                </button>
              </form>
            </div>

            {/* ── Info contact (2/5) ── */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">
                Informații de contact
              </h2>

              {[
                {
                  icon: '📧',
                  label: 'Email',
                  value: 'prenume.nume@student.ac.ro',
                  href: 'mailto:prenume.nume@student.ac.ro',
                },
                {
                  icon: '💼',
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/username',
                  href: 'https://linkedin.com/in/username',
                },
                {
                  icon: '💻',
                  label: 'GitHub',
                  value: 'github.com/username',
                  href: 'https://github.com/username',
                },
                {
                  icon: '📍',
                  label: 'Locație',
                  value: 'Timișoara, România',
                  href: null,
                },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 p-4
                  bg-gray-50 dark:bg-slate-800/60 rounded-2xl
                  border border-gray-100 dark:border-slate-700">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-900 dark:text-white
                          hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Nota disponibilitate */}
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40
                border border-indigo-100 dark:border-indigo-800 rounded-2xl">
                <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed">
                  🟢 <strong>Disponibil</strong> pentru stagii de practică și colaborări
                  în proiecte web. Timp de răspuns: 24–48h.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
