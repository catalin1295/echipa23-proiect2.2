/**
 * Date mock — folosite automat daca Strapi nu e disponibil.
 * Structura respecta formatul Strapi v4.
 */

export const MOCK_CATEGORIES = [
  { id: 1, attributes: { name: 'Proiecte',   slug: 'proiecte'   } },
  { id: 2, attributes: { name: 'Tutoriale',  slug: 'tutoriale'  } },
  { id: 3, attributes: { name: 'Reflecții',  slug: 'reflectii'  } },
  { id: 4, attributes: { name: 'Design',     slug: 'design'     } },
];

export const MOCK_ARTICLES = [
  {
    id: 1,
    attributes: {
      title: 'Construiesc primul meu proiect cu React',
      slug: 'primul-proiect-react',
      excerpt:
        'Descoperă cum am realizat primul meu proiect web cu React și Tailwind CSS — provocările întâmpinate și lecțiile esențiale.',
      content: `
## Introducere

Am început să lucrez cu React acum câteva luni, iar experiența a fost una cu totul nouă față de HTML și CSS pur.

## Ce am folosit

- **React 18** pentru componente
- **Tailwind CSS** pentru stilizare rapidă
- **Vite** ca bundler
- **React Router** pentru navigare

## Principalele provocări

Cel mai greu a fost să înțeleg conceptul de **state** și cum datele "curg" de la parent la child prin props. De asemenea, useEffect m-a pus pe gânduri la început.

## Concluzie

React merită cu siguranță investiția de timp. Odată ce înțelegi componentele și hookurile de bază, productivitatea crește semnificativ.
      `.trim(),
      publishedAt: '2024-03-15T10:00:00.000Z',
      image: { data: null },
      category: { data: { id: 1, attributes: { name: 'Proiecte', slug: 'proiecte' } } },
    },
  },
  {
    id: 2,
    attributes: {
      title: 'Git și GitHub: ghid complet pentru începători',
      slug: 'git-github-ghid',
      excerpt:
        'Tot ce trebuie să știi despre Git și GitHub pentru a gestiona proiectele de cod eficient, de la primul commit la pull request.',
      content: `
## De ce Git?

Fără un sistem de versionare, lucrul în echipă devine haos. Git rezolvă exact această problemă.

## Comenzile esențiale

\`\`\`bash
git init          # inițializează un repo
git add .         # adaugă toate fișierele
git commit -m "..." # salvează o versiune
git push          # trimite pe GitHub
git pull          # preia ultimele modificări
\`\`\`

## Branches

Creează un branch nou pentru fiecare funcționalitate:

\`\`\`bash
git checkout -b feature/navbar
# ... lucrezi ...
git merge feature/navbar
\`\`\`

## Pull Requests

Când lucrezi în echipă, PR-urile permit code review înainte de merge.
      `.trim(),
      publishedAt: '2024-02-20T10:00:00.000Z',
      image: { data: null },
      category: { data: { id: 2, attributes: { name: 'Tutoriale', slug: 'tutoriale' } } },
    },
  },
  {
    id: 3,
    attributes: {
      title: 'Reflecții după primul an de facultate',
      slug: 'reflectii-primul-an',
      excerpt:
        'Ce am descoperit în primul an de Informatică Aplicată: despre programare, colegi, proiecte și cum să faci față tuturor.',
      content: `
## Un an plin

Primul an a fost intens. De la algoritmi și structuri de date până la baze de date și tehnologii web — fiecare disciplină a adus ceva nou.

## Ce m-a surprins

Nu mă așteptam cât de important este **lucrul în echipă**. Proiectele de grup te învață să comunici, să delegi și să rezolvi conflicte — abilități la fel de valoroase ca și codul.

## Ce aș face diferit

- Aș începe să folosesc Git din prima săptămână
- Aș citi documentația oficială, nu doar tutoriale YouTube
- Aș pune mai multe întrebări la laborator

## Concluzie

E greu, dar merită. Fiecare bug rezolvat aduce o satisfacție unică.
      `.trim(),
      publishedAt: '2024-01-18T10:00:00.000Z',
      image: { data: null },
      category: { data: { id: 3, attributes: { name: 'Reflecții', slug: 'reflectii' } } },
    },
  },
  {
    id: 4,
    attributes: {
      title: 'Introducere în Tailwind CSS',
      slug: 'introducere-tailwind-css',
      excerpt:
        'Tailwind CSS schimbă modul în care stilizăm aplicațiile web. Descoperă de ce utility-first este abordarea câștigătoare.',
      content: `
## Ce este Tailwind?

Tailwind este un framework CSS "utility-first" — în loc să scrii clase custom, folosești clase predefinite direct în HTML/JSX.

## Exemplu practic

\`\`\`html
<!-- Fara Tailwind -->
<button class="btn-primary">Click</button>

<!-- Cu Tailwind -->
<button class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
  Click
</button>
\`\`\`

## Avantaje

- **Rapiditate** — nu mai scrii CSS separat
- **Consistență** — spacing, culori, fonturi standardizate
- **Dark mode** — o singură clasă \`dark:\`
- **Responsive** — prefixe \`md:\`, \`lg:\` etc.

## Când să NU folosești Tailwind

Pentru proiecte foarte mari cu un design system bine definit, CSS Modules sau styled-components pot fi mai potrivite.
      `.trim(),
      publishedAt: '2024-01-05T10:00:00.000Z',
      image: { data: null },
      category: { data: { id: 4, attributes: { name: 'Design', slug: 'design' } } },
    },
  },
];

export const MOCK_ABOUT = {
  id: 1,
  attributes: {
    name: 'Prenume Nume',
    role: 'Student în Informatică Aplicată',
    bio: 'Sunt student în anul II la Facultatea de Automatică și Calculatoare. Pasionat de web development modern — în special de ecosistemul React și arhitecturile headless CMS. Îmi place să construiesc interfețe curate, funcționale și accesibile.',
    skills: [
      'React', 'JavaScript', 'Tailwind CSS', 'HTML & CSS',
      'Node.js', 'Git & GitHub', 'Strapi', 'Netlify',
      'Figma', 'REST API', 'Responsive Design', 'Dark Mode',
    ],
    experience: [
      {
        year: '2024',
        title: 'Proiect 2 — Strapi & React & Netlify',
        description: 'Site de prezentare personal cu stack modern: React, Tailwind, Strapi headless CMS, deploy pe Netlify.',
      },
      {
        year: '2023',
        title: 'Proiect 1 — HTML, CSS & JavaScript',
        description: 'Primul proiect web realizat în cadrul disciplinei de Tehnologii Web. Site static cu animații CSS.',
      },
      {
        year: '2023',
        title: 'Admitere Facultate',
        description: 'Am intrat la Informatică Aplicată — începutul unei aventuri în lumea programării.',
      },
    ],
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    avatar: { data: null },
  },
};
