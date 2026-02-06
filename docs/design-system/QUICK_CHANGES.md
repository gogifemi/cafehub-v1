# Quick Changes (Recipes)

Practical “how do I…” changes for CafeHub’s variable-driven design system.

**Source of truth:** `src/index.css` (CSS variables)  
**Tailwind mapping:** `tailwind.config.js` (semantic utilities)

## Change primary color (accent)

Edit `--color-accent` (and optionally soft/strong) in `:root` or in a theme block:

```css
:root {
  --color-accent: 20 70% 46%; /* cinnamon */
  --color-accent-soft: 20 80% 60%;
  --color-accent-strong: 20 90% 50%;
}
```

Result:

- Buttons using `bg-accent` update automatically
- Borders using `hover:border-accent` update automatically
- Rating stars using `text-accent` update automatically

## Make the UI “more monochrome”

Use the core theme (already implemented):

```ts
document.documentElement.dataset.theme = 'core';
```

Or tweak the `core` theme values in `src/index.css`:

```css
:root[data-theme='core'] {
  --color-accent: 0 0% 100%;
  --color-accent-soft: 0 0% 90%;
}
```

## Add a new theme (e.g. “latte”)

1. Add a new theme block:

```css
:root[data-theme='latte'] {
  --color-bg: 36 80% 92%;
  --color-bg-soft: 35 70% 88%;
  --color-surface: 36 60% 90%;
  --color-surface-subtle: 36 40% 86%;

  --color-text: 24 32% 15%;
  --color-text-muted: 24 22% 30%;

  --color-accent: 28 68% 46%;
  --color-accent-soft: 32 85% 60%;
  --color-accent-strong: 28 92% 48%;

  color-scheme: light;
}
```

2. Set it at runtime:

```ts
document.documentElement.dataset.theme = 'latte';
```

## “Add dark mode”

CafeHub already defaults to a dark look. If you want **system-based** switching:

1. Keep `:root` as your default (dark) tokens
2. Add a media query for a light theme (or apply a `data-theme='light'`)

Example:

```css
@media (prefers-color-scheme: light) {
  :root:not([data-theme]) {
    --color-bg: 0 0% 100%;
    --color-bg-soft: 0 0% 98%;
    --color-surface: 0 0% 100%;
    --color-surface-subtle: 0 0% 96%;
    --color-border-subtle: 0 0% 85%;

    --color-text: 0 0% 10%;
    --color-text-muted: 0 0% 35%;

    --color-accent: 28 68% 46%;
    --color-accent-soft: 28 80% 60%;
    --color-accent-strong: 28 92% 48%;

    color-scheme: light;
  }
}
```

Tip: If you always set `data-theme` (like `ThemeToggle` does), the media query can be reserved for first-time visitors.

## Change the rounded font / typography

Update `--font-sans` in `src/index.css`:

```css
:root {
  --font-sans: 'Nunito', system-ui, -apple-system, 'Segoe UI Rounded', 'Segoe UI', sans-serif;
}
```

Then add a font import (if you choose a web font) in `index.html` or via CSS.

## Increase spacing / corner radius across the UI

Most components use consistent radii:

- cards: `rounded-2xl`
- inputs: `rounded-xl`
- pills: `rounded-full`

To change globally, you can standardize via component wrappers (recommended), or extend Tailwind config (advanced).

## Add a new semantic token

Example: add `--color-danger`:

1. Add variable(s) in `:root` and theme blocks:

```css
:root {
  --color-danger: 0 84% 60%;
}
```

2. Expose it in `tailwind.config.js`:

```js
colors: {
  // ...
  status: {
    success: withOpacity('--color-success'),
    warning: withOpacity('--color-warning'),
    info: withOpacity('--color-info'),
    danger: withOpacity('--color-danger')
  }
}
```

3. Use it in components:

```tsx
<span className="text-status-danger">Error</span>
```

## Screenshot checklist (recommended)

Add these to `docs/design-system/images/`:

- `theme-turkish.png` and `theme-core.png`
- `components-card.png` (card + hover)
- `components-input.png` (input focus ring)

Then embed them in the docs as needed:

```md
![Core theme](./images/theme-core.png)
```

