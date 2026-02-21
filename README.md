# AI4Teachers Platform

An educational web platform developed as part of the **Erasmus+ AI4T project** (2024-1-HR01-KA210-SCH-000256076). The platform provides K-12 teachers with structured learning resources about Artificial Intelligence and includes a Knowledge Assessment System (KAS) to evaluate understanding and generate personalized learning paths.

## Features

- **Resource Library** — 10 lessons organized into 4 categories (AI Literacy, Practical AI Skills, Considerations on AI, AI for All Learners) across 3 difficulty levels (Beginner, Intermediate, Advanced)
- **Knowledge Assessment System (KAS)** — 20-question assessment (5 per category) with radar chart visualization, personalized learning path, and PDF export
- **Multi-language support** — UI translations for English, Croatian, Greek, and Romanian (lesson content currently in English)
- **Fully client-side** — No backend, no login, no database. Results stored in browser localStorage
- **Responsive design** — Mobile-first layout with Tailwind CSS

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [React](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [react-i18next](https://react.i18next.com/) | Internationalization |
| [react-markdown](https://github.com/remarkjs/react-markdown) | Markdown rendering |
| [Recharts](https://recharts.org/) | Radar chart for KAS results |
| [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) | PDF export |

## Project Structure

```
src/
  components/
    Home/           # Homepage
    KAS/            # Knowledge Assessment System (wizard, results, radar chart)
    Layout/         # Header, Footer, Layout wrapper
    Lessons/        # Resource list, lesson page, level badges
    common/         # Shared components (filter bar, icons)
  content/
    en/             # English lesson content (Markdown with YAML frontmatter)
      ai-literacy/
      practical-ai-skills/
      considerations-on-ai/
      ai-for-all-learners/
  data/
    kas-questions.json   # Assessment questions & scoring
  hooks/
    useKAS.js       # KAS state management
  i18n/
    locales/        # Translation files (en, hr, el, ro)
  utils/
    scoring.js      # KAS scoring logic
    learningPath.js # Personalized path generator
    markdownLoader.js # Markdown + frontmatter parser
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Install & Run

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`.

## Deployment

The platform is deployed on [Vercel](https://vercel.com/) with automatic deploys on every push to the `main` branch.

## Partners

- **OS Ivana Cankara** (Zagreb, Croatia) — Project Coordinator
- **105 Dimotiko Scholio Thessalonikis** (Thessaloniki, Greece)
- **OS Horvati** (Zagreb, Croatia)
- **Asociatia Adfaber** (Timisoara, Romania)
- **EDUKA — centar za obrazovanje i digitalne alate** (Zagreb, Croatia)

## License

This project is co-funded by the European Union through the Erasmus+ programme.

---

*Built with the support of Claude Code by Anthropic.*
