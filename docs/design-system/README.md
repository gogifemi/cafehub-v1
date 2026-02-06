# CafeHub Design System

CafeHub uses a **variable-driven design system**:

- **Source of truth**: CSS custom properties in `src/index.css`
- **Implementation**: Tailwind utilities mapped to those CSS variables via `tailwind.config.js`
- **Themes**: switch by changing `document.documentElement.dataset.theme` (e.g. `core`, `turkish`)

This setup makes color changes safe and fast: in most cases you can change the app’s look by editing **only the CSS variables**.

## What’s in here

- `COLORS.md`: all design tokens (CSS variables) and how to modify them
- `THEMES.md`: theme switching model + examples
- `COMPONENTS.md`: recommended styling patterns for components
- `QUICK_CHANGES.md`: practical “how do I…” recipes

## Key files (in the app)

- `src/index.css`
  - Defines **token variables** (core + Turkish coffee palette + semantic tokens)
  - Defines theme overrides using `:root[data-theme='...']`
- `tailwind.config.js`
  - Maps semantic Tailwind colors (e.g. `bg-bg`, `text-text-muted`) to CSS variables
- `src/components/layout/ThemeToggle.tsx`
  - Example UI toggle that switches `data-theme` and persists preference in `localStorage`

## How to use the tokens in components

Prefer **semantic tokens** (stable API) over palette names:

```tsx
<div className="bg-bg text-text">
  <div className="rounded-2xl border border-border-subtle bg-surface p-4">
    <p className="text-text-muted">Muted text</p>
    <button className="rounded-full bg-accent px-3 py-1.5 text-core-black">
      Primary action
    </button>
  </div>
</div>
```

## Screenshot placeholders

Drop screenshots into `docs/design-system/images/` and reference them from these docs.

Recommended screenshots to add:

- `images/theme-turkish.png`: Turkish coffee theme home page
- `images/theme-core.png`: Core monochrome theme home page
- `images/tokens-cheatsheet.png`: a “tokens at a glance” table/screenshot

