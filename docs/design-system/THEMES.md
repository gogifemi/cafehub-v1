# Themes (Switching System)

CafeHub themes work by setting a single attribute on the `<html>` element:

```ts
document.documentElement.dataset.theme = 'turkish'; // or 'core'
```

That attribute activates CSS selectors in `src/index.css`:

```css
:root[data-theme='core'] { /* overrides */ }
:root[data-theme='turkish'] { /* overrides */ }
```

Tailwind classes do **not** change between themes. They always reference semantic tokens like `bg-bg`, `text-text-muted`, `border-border-subtle`, etc.

## Current themes

- **`turkish`**: warm Turkish coffee palette (default)
- **`core`**: pure monochrome (logo-based)

## ThemeToggle example (already in the app)

File: `src/components/layout/ThemeToggle.tsx`

- Reads the theme from `localStorage`
- Sets `document.documentElement.dataset.theme`
- Persists changes back to `localStorage`

### Minimal example (no React)

If you need a quick test:

```html
<button id="toggle">Toggle theme</button>
<script>
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme || 'turkish';

  document.getElementById('toggle').addEventListener('click', () => {
    html.dataset.theme = html.dataset.theme === 'core' ? 'turkish' : 'core';
  });
</script>
```

## Adding a new theme

1. Pick a name, e.g. `latte`
2. Add a CSS override block in `src/index.css`:

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
}
```

3. Update your toggle UI (optional) to include the new option.

## Recommended screenshots

Add these files and reference them here:

- `images/theme-turkish.png`
- `images/theme-core.png`

Then embed them:

```md
![Turkish theme](./images/theme-turkish.png)
![Core theme](./images/theme-core.png)
```

