# Salt Essential IT — Website

The official website for **Salt Essential IT**, Namibia's leading Managed IT Services Provider. Built as a React SPA and deployed on the Dfinity Internet Computer Protocol (ICP) as a decentralised asset canister.

---

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start dev server → http://localhost:5173
npm run build      # Production build → dist/
npm run lint       # ESLint validation
npm run preview    # Preview production build locally
npx tsc --noEmit   # Type-check without building
```

---

## Tech Stack

| Layer | Tool | Version |
| --- | --- | --- |
| UI Framework | React | 19 |
| Language | TypeScript | ~5.9 |
| Build Tool | Vite | 7 |
| Styling | Tailwind CSS | 3 |
| Routing | React Router | 7 |
| Animation | Framer Motion | 12 |
| Forms | React Hook Form + Zod | 7 / 4 |
| Email | EmailJS Browser SDK | 4 |
| SEO | React Helmet Async | 3 |
| Icons | Lucide React | latest |
| Fonts | Fontsource Roboto | 5 |
| Sanitisation | DOMPurify | 3 |
| Hosting | Dfinity ICP Asset Canister | — |
| CI/CD | GitHub Actions | — |
| Chatbot | Zolt (Render-hosted) | — |

---

## Environment Variables

Create a `.env.local` file at the project root (never commit this file):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
VITE_EMAILJS_SEED_TEMPLATE_ID=your_seed_template_id
VITE_EMAILJS_TEMPLATE_ID=your_enquiry_template_id
VITE_ZOLT_URL=https://your-zolt-instance.onrender.com
```

---

## Deployment — Dfinity Internet Computer

The site is hosted as an **asset canister** on the Internet Computer Protocol (ICP). The frontend is stored on-chain — no traditional server required.

### Prerequisites

```bash
# Install DFX (Dfinity SDK) — Linux/macOS only
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Verify
dfx --version
```

> DFX runs on Linux. Deploy from the Linux laptop or a Linux CI runner.

### Deploy to Mainnet

```bash
npm run build
dfx deploy salt_frontend --network ic
```

### Check Canister Status & Cycles

```bash
dfx canister status salt_frontend --network ic
dfx cycles balance --network ic
```

### Local Development with ICP Replica

```bash
dfx start --background   # Start local replica
dfx deploy               # Deploy locally (free, no cycles)
dfx stop                 # Stop replica
```

---

## Project Structure

```text
src/
├── assets/          # Static assets imported by JS (logo, etc.)
├── components/      # Shared components (Navbar, Footer, PageHero, ZoltWidget, etc.)
├── data/            # Static content (news.ts, articleContent.ts)
├── hooks/           # Reserved for ICP wallet integration
├── pages/           # One file per route
│   └── about/       # About sub-pages (Story, Values, Milestones, Awards, Team)
├── App.tsx          # Router shell + layout
├── main.tsx         # Entry point
└── index.css        # Global styles + Tailwind directives

public/
├── .ic-assets.json5 # On-chain CSP headers (picked up by DFX from dist/)
├── robots.txt
├── sitemap.xml
├── favicon.png
├── Articles/        # News article images
├── Awards/          # Award images
├── CATs/            # CATS page images
├── Documents/       # Downloadable PDF documents
├── Internal/        # Internal assets
├── LOGOS/           # Brand logos
├── Partners/        # Partner logos
├── Products/        # Shop product images
├── Salties/         # Team member photos
├── Sections/        # Hero background images
├── Services/        # Services section images
├── Values/          # Values section images
└── Zolt/            # Zolt chatbot assets
```

---

## Pages & Routes

All pages (except Home) are lazy-loaded for optimal performance.

| Route | Page | Description |
| --- | --- | --- |
| `/` | Home | Landing page |
| `/about` | About | About Salt overview |
| `/about/story` | Our Story | Company history & origin |
| `/about/values` | Our Values | Core company values |
| `/about/milestones` | Milestones | Key company milestones |
| `/about/awards` | Awards | Awards & recognition gallery |
| `/about/team` | Meet the Team | Team member profiles |
| `/cats` | CATS | Cyber Awareness Training sessions |
| `/services` | Services | Managed IT services overview |
| `/seed` | SEED | SEED programme information & application |
| `/shop` | Shop | Product enquiry shop |
| `/news` | News | News articles listing |
| `/news/:slug` | News Article | Individual article view |
| `/contact` | Contact | Contact form & map |
| `/vacancies` | Vacancies | Job listings |
| `/partners` | Partners | Technology partners |
| `/documents` | Documents | Downloadable documents |
| `/privacy-policy` | Privacy Policy | Legal privacy policy |
| `/user-agreement` | User Agreement | Terms of use |
| `/copyrights` | Copyrights | Copyright notices |

---

## Official Documentation

### Core Framework & Build

| Tool | Docs |
| --- | --- |
| **React 19** | https://react.dev |
| **TypeScript** | https://www.typescriptlang.org/docs |
| **Vite** | https://vite.dev |
| **React Router v7** | https://reactrouter.com/home |

### Styling & Animation

| Tool | Docs |
| --- | --- |
| **Tailwind CSS v3** | https://tailwindcss.com/docs |
| **Tailwind Typography Plugin** | https://tailwindcss.com/docs/typography-plugin |
| **Framer Motion** | https://motion.dev/docs |
| **Lucide React** (icons) | https://lucide.dev |

### Forms & Validation

| Tool | Docs |
| --- | --- |
| **React Hook Form** | https://react-hook-form.com |
| **Zod** | https://zod.dev |
| **@hookform/resolvers** | https://github.com/react-hook-form/resolvers |

### Email & Communication

| Tool | Docs |
| --- | --- |
| **EmailJS** | https://www.emailjs.com/docs |
| **EmailJS Browser SDK** | https://www.emailjs.com/docs/sdk/installation |

### Security & SEO

| Tool | Docs |
| --- | --- |
| **DOMPurify** | https://github.com/cure53/DOMPurify |
| **React Helmet Async** | https://github.com/staylor/react-helmet-async |

### Hosting & Deployment

| Tool | Docs |
| --- | --- |
| **Dfinity ICP** | https://internetcomputer.org/docs/current/home |
| **DFX CLI** | https://internetcomputer.org/docs/current/developer-docs/developer-tools/cli-tools/cli-reference/dfx-parent |
| **Asset Canister** | https://internetcomputer.org/docs/current/developer-docs/web-apps/application-frontends/overview |
| **ICP Cycles & Gas** | https://internetcomputer.org/docs/current/developer-docs/gas-cost |
| **Custom Domains on ICP** | https://internetcomputer.org/docs/current/developer-docs/web-apps/custom-domains/using-custom-domains |
| **GitHub Actions** | https://docs.github.com/en/actions |

### Chatbot & External Services

| Tool | Docs |
| --- | --- |
| **Render** (Zolt hosting) | https://docs.render.com |
| **Google Maps Embed** | https://developers.google.com/maps/documentation/embed/get-started |

---

## CI/CD

Two GitHub Actions workflows are configured in `.github/workflows/`:

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `ci.yml` | Push to `main` / `develop`, PRs | Type-check, lint, build |
| `deploy.yml` | Manual (`workflow_dispatch`) | Deploy to ICP mainnet |

To deploy, go to **GitHub → Actions → Deploy to Internet Computer → Run workflow** and type `DEPLOY` to confirm.

### Required GitHub Secrets

```text
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_PUBLIC_KEY
VITE_EMAILJS_CONTACT_TEMPLATE_ID
VITE_EMAILJS_SEED_TEMPLATE_ID
VITE_ZOLT_URL
DFX_IDENTITY_PEM
```

---

## Pre-Launch Checklist

- [ ] Add `salt.na` to EmailJS allowed origins dashboard
- [ ] Set all `VITE_*` variables in `.env.local` on the Linux deploy laptop
- [ ] Add `DFX_IDENTITY_PEM` secret to GitHub repository settings
- [ ] Verify canister has > 5 trillion cycles before go-live
- [ ] Set up DNS CNAME for `www.salt.na` → ICP boundary node
- [ ] Test all three EmailJS forms (Contact, SEED, Shop enquiry) end-to-end
- [ ] Confirm all PDF documents are accessible after deploy
- [ ] Verify all news article slugs resolve correctly
- [ ] Confirm CATS page content and images load correctly
