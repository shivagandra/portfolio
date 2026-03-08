# Manual Cross-Device QA Checklist

## 1) Device Matrix (Chrome DevTools)
- Mobile Small: iPhone SE (375x667)
- Mobile Large: iPhone 14 Pro Max (430x932)
- Tablet: iPad Air (820x1180)
- Laptop: 1366x768
- Desktop Wide: 1920x1080

## 2) Global UX Checks (all routes)
- Top nav is visible and usable.
- Active nav item is clear.
- No horizontal scroll appears unexpectedly.
- Main content starts below fixed nav (no clipping).
- Keyboard `Tab` order is logical.
- `Skip to main content` works.
- Focus outline is visible on interactive elements.
- Page transition keeps expected scroll position (top on route change).

## 3) Route-by-Route Checks
- `/`: hero text wraps correctly; CTA buttons are fully visible.
- `/#/about`: cards stack cleanly on mobile; no text overlap.
- `/#/experience`: timeline cards do not overlap central line on tablet/mobile.
- `/#/projects`: filter bar wraps correctly; modal opens/closes on Esc and backdrop click.
- `/#/skills`: radar chart is readable on mobile; domain cards remain tappable.
- `/#/education`: coursework tags do not overflow parent containers.
- `/#/certifications`: certification cards maintain equal spacing and no clipping.
- `/#/contact`: form validation appears clearly; form fields are label-associated.

## 4) SEO Checks (Browser)
- Open page source and confirm:
  - `title`
  - `meta[name=description]`
  - Open Graph tags
  - Twitter tags
  - canonical link
- Confirm `robots.txt` is reachable at `/robots.txt`.
- Confirm `sitemap.xml` is reachable at `/sitemap.xml`.

## 5) Lighthouse (Manual)
- Run Lighthouse in Chrome for Home + Projects + Contact.
- Mode: Navigation
- Device: Mobile + Desktop
- Categories: Performance, Accessibility, Best Practices, SEO

## 6) Interaction QA
- Keyboard shortcuts:
  - `Ctrl/Cmd + K` opens quick search.
  - `Esc` closes quick search / project modal.
- Hover/focus/touch prefetch does not break navigation.
- Copy email button in Contact gives success feedback.

## 7) Regression Sign-off
- Capture screenshots for each route in mobile/tablet/desktop.
- Compare spacing, typography, and CTA visibility with previous deployment.
- Confirm no broken links (GitHub, LinkedIn, resume, cert links).
