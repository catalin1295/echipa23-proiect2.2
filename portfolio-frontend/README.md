# 🚀 Portfolio Personal — Proiect 2

Site de prezentare personală realizat cu **React**, **Tailwind CSS** și **Strapi** (headless CMS), găzduit pe **Netlify**.

## 🛠️ Stack tehnologic

| Tehnologie | Scop |
|------------|------|
| React 18 | Interfață frontend (SPA) |
| React Router v6 | Rutare între pagini |
| Tailwind CSS 3 | Stilizare responsive |
| Strapi v4 | Backend CMS headless |
| Netlify | Găzduire frontend |
| GitHub | Versionare cod |

## 🔤 Fonturi utilizate (tweakcn.com)

1. **Bricolage Grotesque** — titluri și headinguri
2. **Nunito** — text body și UI
3. **Playfair Display** — text accent italic

## 📄 Pagini

| Pagină | Rută | Descriere |
|--------|------|-----------|
| Acasă | `/` | Hero banner + categorii + articole recente |
| Blog | `/blog` | Listă articole cu search și filtrare pe categorii |
| Articol | `/blog/:slug` | Detaliu articol individual |
| Despre | `/about` | Pagină Single Type din Strapi |
| Contact | `/contact` | Formular de contact (trimite la Strapi) |

## 🚀 Pornire locală

```bash
# 1. Instalare dependențe
npm install

# 2. Configurare variabile de mediu
cp .env.example .env
# Editează .env cu URL-ul Strapi-ului tău

# 3. Pornire server de dezvoltare
npm run dev
```

Site-ul va fi disponibil la `http://localhost:5173`

> **Notă:** Fără Strapi, site-ul funcționează cu date mock (demonstrative).

## ⚙️ Content Types Strapi necesare

### Collection Type: Article
| Câmp | Tip |
|------|-----|
| title | Text (scurt) |
| slug | UID → title |
| excerpt | Text (scurt) |
| content | Rich Text |
| image | Media (singulară) |
| category | Relation → Category (many-to-one) |

### Collection Type: Category
| Câmp | Tip |
|------|-----|
| name | Text (scurt) |
| slug | UID → name |

### Single Type: About
| Câmp | Tip |
|------|-----|
| name | Text (scurt) |
| role | Text (scurt) |
| bio | Text (lung) |
| skills | JSON |
| github | Text (scurt) |
| linkedin | Text (scurt) |
| avatar | Media (singulară) |

### Collection Type: Contact-form
| Câmp | Tip |
|------|-----|
| name | Text (scurt) |
| email | Email |
| subject | Text (scurt) |
| message | Text (lung) |

## 🔓 Permisiuni Strapi

Settings → Users & Permissions → Roles → **Public**:
- Article: ✅ find, ✅ findOne
- Category: ✅ find, ✅ findOne
- About: ✅ find
- Contact-form: ✅ create

## 🌐 Deploy Netlify

1. Push pe GitHub
2. Netlify → Add new site → Import from GitHub
3. Settings: Build command: `npm run build`, Publish dir: `dist`
4. Environment variables: `VITE_STRAPI_URL=https://strapi-url.onrender.com`

## ✨ Funcționalități

- 🌙 Light/Dark mode cu persistență în localStorage
- 📱 Responsive — meniu hamburger + offcanvas pe mobil
- 📌 Navbar sticky cu efect blur la scroll
- 🔍 Search articole în timp real
- 🏷️ Filtrare pe categorii
- ⚡ Date mock incluse (funcționează fără Strapi)

## 👥 Echipă

- Membru 1
- Membru 2
- Membru 3
- Membru 4

---

*Proiect 2 — Tehnologii Web, Informatică Aplicată*
