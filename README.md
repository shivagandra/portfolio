# Shiva Krishna - DevOps and Cloud Engineer Portfolio

Multi-page portfolio website built with React, TypeScript, Tailwind CSS, and Vite.

## Tech Stack
- React + TypeScript
- Tailwind CSS
- React Router
- GSAP (animations)
- Vite

## Prerequisites
- Node.js 18+
- npm 9+

## Local Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Quality and Testing

### Lighthouse CI (local)
```bash
npm run build
npm run qa:lighthouse
```

### Playwright responsive UI tests
> Windows note: if Playwright reports missing `winldd`, run:
> `npx playwright install winldd`
```bash
npm run qa:ui
npm run qa:ui:report
```

### Run full automated QA
```bash
npm run qa
```

## GitHub Actions
A CI workflow runs automated quality checks on `push`/`pull_request` to `main`:
- Lighthouse CI audit
- Playwright responsive UI tests

Workflow file:
- `.github/workflows/quality-audit.yml`

## Manual QA Checklist
Use this browser checklist for final visual sign-off:
- `docs/manual-qa-checklist.md`

