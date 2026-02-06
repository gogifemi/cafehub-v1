# Colors & Tokens (CSS Variables)

CafeHub colors are defined as **HSL triplets** in CSS variables so Tailwind can apply opacity using the `hsl(var(--token) / <alpha-value>)` pattern.

**Where to edit:** `src/index.css`

## Token layers

CafeHub uses 3 layers:

1. **Core palette** (logo monochrome): `--core-*`
2. **Theme palettes** (e.g. Turkish coffee): `--coffee-*`, `--spice-*`
3. **Semantic tokens** (what components use): `--color-*`

### Why semantic tokens?

Semantic tokens are the stable “API” for the UI:

- Components use `bg-bg`, `text-text-muted`, `border-border-subtle`, etc.
- Themes remap those semantics to different palette values.
- You can redesign the brand without rewriting component classNames.

## Full token list

### Typography

```css
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Rounded', 'Segoe UI Rounded',
  'Segoe UI', sans-serif;
```

### Core monochrome (logo)

```css
--core-black: 0 0% 0%;
--core-white: 0 0% 100%;
```

### Turkish coffee palette (browns, creams, spices)

```css
--coffee-espresso: 24 32% 15%;
--coffee-grounds: 26 32% 20%;
--coffee-foam: 35 70% 88%;
--coffee-bronze: 28 68% 46%;
--coffee-cream: 36 80% 92%;

--spice-cardamom: 142 40% 45%;
--spice-cinnamon: 20 70% 46%;
--spice-clove: 18 42% 32%;
```

### Semantic tokens (components should use these)

Backgrounds & surfaces:

```css
--color-bg: ...;
--color-bg-soft: ...;
--color-surface: ...;
--color-surface-subtle: ...;
--color-surface-elevated: ...;
```

Borders:

```css
--color-border-subtle: ...;
--color-border: ...;
--color-border-strong: ...;
```

Text:

```css
--color-text: ...;
--color-text-muted: ...;
--color-text-subtle: ...;
--color-text-accent: ...;
```

Accent:

```css
--color-accent: ...;
--color-accent-soft: ...;
--color-accent-strong: ...;
```

Status:

```css
--color-success: ...;
--color-warning: ...;
--color-info: ...;
```

Focus ring:

```css
--color-ring: ...;
```

Gradient accents:

```css
--color-accent-1: ...;
--color-accent-2: ...;
--color-accent-3: ...;
--color-accent-4: ...;
```

## How to modify colors (practical)

### Change the primary (accent) color

Most components use `accent.*`. Update these in `:root` (or in the theme override you care about):

```css
:root {
  --color-accent: 28 68% 46%;
  --color-accent-soft: 32 85% 60%;
  --color-accent-strong: 28 92% 48%;
}
```

To instantly see more “spicy cinnamon”:

```css
:root {
  --color-accent: var(--spice-cinnamon);
  --color-accent-soft: 20 80% 60%;
  --color-accent-strong: 20 90% 50%;
}
```

### Make backgrounds lighter/darker (overall feel)

The overall app background comes from:

- `--color-bg` (deep base)
- `--color-bg-soft` (used in radial gradient + inputs)

Example (slightly lighter):

```css
:root[data-theme='turkish'] {
  --color-bg: 24 32% 18%;
  --color-bg-soft: 26 32% 24%;
}
```

### Adjust borders globally

Borders across the app use these tokens:

```css
--color-border-subtle
--color-border
--color-border-strong
```

Increase contrast:

```css
:root {
  --color-border-subtle: 24 25% 38%;
  --color-border: 24 30% 48%;
  --color-border-strong: 24 35% 60%;
}
```

## Using tokens in CSS (without Tailwind)

If you need custom CSS (rare), use:

```css
.my-box {
  background: hsl(var(--color-surface));
  border: 1px solid hsl(var(--color-border-subtle));
  color: hsl(var(--color-text));
}
```

## Using tokens in Tailwind utilities

Because `tailwind.config.js` maps colors to variables, you can use opacity modifiers:

```tsx
<div className="bg-bg/80 text-text">
  <div className="border border-border-subtle bg-surface p-4">
    <button className="bg-accent text-core-black hover:bg-accent-strong">
      Action
    </button>
  </div>
</div>
```

