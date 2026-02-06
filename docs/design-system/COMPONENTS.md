# Component Styling Patterns

This document explains the recommended styling approach for CafeHub components.

## Guiding principles

- **Use semantic tokens**, not fixed palette colors.
  - Prefer `bg-bg`, `bg-surface`, `text-text-muted`, `border-border-subtle`, `bg-accent`, etc.
  - Avoid `bg-slate-900`, `text-amber-400`, etc. in new code.
- **Compose UI with a small set of building blocks**:
  - “Surface” containers (cards/panels)
  - Inputs
  - Pills (tags/badges)
  - Buttons
- **Keep theme logic out of components**
  - Theme switching should only change CSS variables.

## Common building blocks

### Page shell

```tsx
export const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-bg text-text">{children}</div>
);
```

### Surface card

Use `surface` + `border` tokens for consistent elevation.

```tsx
export const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm shadow-black/30">
    {children}
  </div>
);
```

### Subtle surface (for secondary areas)

```tsx
<div className="rounded-2xl border border-border-subtle bg-surface-subtle p-3">
  ...
</div>
```

### Pills / tags

```tsx
<span className="rounded-full bg-surface-subtle px-2.5 py-0.5 text-[11px] text-text-subtle">
  Wi‑Fi
</span>
```

Hover treatment (accent-tinted):

```tsx
<span className="rounded-full bg-surface-subtle px-2 py-0.5 text-[11px] text-text-subtle hover:bg-accent-soft/15 hover:text-accent-soft">
  Quiet
</span>
```

### Inputs

Use `bg-bg-soft` and `border-border` with an accent focus ring.

```tsx
<div className="rounded-xl border border-border bg-bg-soft px-3 py-2 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/60">
  <input
    className="w-full bg-transparent text-text placeholder:text-text-subtle focus:outline-none"
    placeholder="Search…"
  />
</div>
```

### Buttons

Primary button:

```tsx
<button className="rounded-full bg-accent px-4 py-2 text-core-black hover:bg-accent-strong">
  Primary action
</button>
```

Secondary (surface) button:

```tsx
<button className="rounded-full border border-border-subtle bg-surface px-3 py-2 text-text-muted hover:border-border-strong hover:text-text">
  Secondary
</button>
```

## Patterns already used in the app

- `src/components/cafes/CafeCard.tsx`
  - Uses `bg-surface`, `border-border-subtle`, `text-text-muted`, `text-status-success`, `text-accent`
- `src/components/cafes/SearchBar.tsx`
  - Uses `bg-bg-soft`, `border-border`, and `ring-accent` focus patterns
- `src/components/layout/Navbar.tsx`
  - Uses semantic tokens + a gradient built from `accent` tokens

## Screenshot suggestions

Useful screenshots for component guidelines:

- `images/components-card.png`: Cafe card in both themes (side-by-side)
- `images/components-input.png`: Search input focus state

Embed like:

```md
![Cafe card](./images/components-card.png)
```

