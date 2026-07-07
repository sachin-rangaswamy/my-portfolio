# Ψ — The Quantum Designer

> Multilingual research portfolio of **Sachin Rangaswamy** — Research Scientist,
> Leibniz Institute for Materials Engineering (Leibniz IWT), Bremen.
>
> *"From electrons to engineering components — connecting physical scales through computation."*

An interactive scientific experience: the visitor journeys through the length
scales of materials simulation — quantum → disordered alloys → atomistic →
microstructure → continuum → engineering — designed by Ψ, the wavefunction.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + CSS variables |
| Animation | Framer Motion + GSAP ScrollTrigger |
| 3D | Three.js + React Three Fiber + Drei |
| Math | KaTeX |
| Content | MDX (`content/projects/*.mdx`) via `next-mdx-remote` |
| i18n | next-intl — `/en`, `/de`, `/es` |

## Development

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /en
npm run build    # production build
npm start        # serve the production build
```

## Project structure

```
app/[locale]/            pages: home, research, projects(+[slug]), publications, contact
components/              Navbar, Hero, ScaleBridge, CrystalVisualization, ParticleField, …
content/projects/*.mdx   research project content (frontmatter + MDX body)
lib/                     scales, skills, publications data + MDX loader
messages/{en,de,es}.json all UI translations
i18n/                    next-intl routing / navigation / request config
```

## Editing content

- **Projects** — add an `.mdx` file to `content/projects/` with frontmatter
  (`title`, `summary`, `problem`, `methodology`, `tools`, `outcomes`, `scales`,
  `featured`, `order`). It appears automatically in the grid, detail route and sitemap.
- **Publications** — edit `lib/publications.ts`. Entries with
  `status: 'in-preparation'` show a badge; published entries render a DOI link.
  The two current entries are placeholders derived from ongoing work — replace
  them as manuscripts appear.
- **Translations** — edit `messages/en.json`, `de.json`, `es.json` (same keys).
- **Calendly** — the booking link `https://calendly.com/sachin-rangaswamy` is a
  placeholder in `components/ContactSection.tsx`; point it at your real Calendly
  once created (optionally swap the placeholder box for Calendly's inline embed).

## Deployment (Vercel + custom domain)

1. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<you>/portfolio.git
   git push -u origin main
   ```
2. Import the repo at [vercel.com/new](https://vercel.com/new) — zero config needed.
3. Add the domain `sachinrangaswamy.com` under **Project → Settings → Domains**
   and follow the DNS instructions (A record → `76.76.21.21` or CNAME →
   `cname.vercel-dns.com`).
4. SEO is preconfigured: per-locale metadata + hreflang alternates, Open Graph,
   JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`.

## Performance & accessibility

- Three.js hero scene is lazy-loaded (`next/dynamic`, client-only) with a light fallback.
- Particle field is a 2D canvas with adaptive particle count and DPR capping;
  it pauses when the tab is hidden.
- `prefers-reduced-motion` is respected globally (CSS) and in every JS-driven
  animation (Framer Motion, GSAP, R3F, canvas).
- Static rendering for all locales via `setRequestLocale` + `generateStaticParams`.

---

*Designed by Ψ · Built by Science*
