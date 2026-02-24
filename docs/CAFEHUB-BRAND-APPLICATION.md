# CafeHub Brand Kit – Analysis & Proposed Application

## 1. Brand Kit Analysis

### Hex color codes (extracted)

| Role | Hex | Use |
|------|-----|-----|
| **Primary accent** | `#ff6b35` | Primary buttons, key CTAs, logo on orange |
| **Secondary accent** | `#4ecdc4` | Secondary actions, teal highlights |
| **Main background (dark)** | `#1a1a1a` | Dark theme background |
| **Text (dark theme)** | `#f7f7f7` | Body text on dark |
| **Heading (dark)** | `#ffe6dd` | Headings on dark theme |
| **Sub-heading (dark)** | `#e6fffd` | Sub-headings on dark theme |
| **Light mode background** | `#f7f7f7` | Light theme background |
| **Light mode text** | `#1a1a1a` | Body text on light |
| **Light mode heading** | `#783319` | Headings on light theme |
| **Light mode sub-heading** | `#1f8e82` | Sub-headings on light (teal) |
| **Button secondary / teal dark** | `#1f8e82` | Less-urgent button bg, hover borders |
| **Icon accent (purple)** | `#bb6eff` | Optional icon color |
| **Icon accent (lime)** | `#78e200` | Optional icon color |
| **Status – order confirmed** | `#8e6840` | Order confirmation |
| **Status – order received** | `#f7d455` | Order received |
| **Status – being prepared** | `#7f7f7f` | In progress |
| **Status – served** | `#1d5c3f` | Served / success |
| **Status – payment received** | `#3d5e84` | Payment success |
| **Status – order cancelled** | `#4e5a5e` | Cancelled |

### Typography

- **Montserrat**: Accents and UI (e.g. headings). Weight: Bold for headings.
- **Inter**: Content (sub-headings, body). Weights: Bold (sub-headings), Light (body).
- Usage: Inter for content, Montserrat for accents/UI.

### Logo

- “cafehub” wordmark + abstract coffee-cup icon (square/QR-style).
- Tagline: “Digital Efficiency, Human Hospitality”.
- Variants: full logo, icon-only; on white, black, and orange (`#ff6b35`) backgrounds.
- Containers: rounded square and circle; black logo on light, white on dark/orange.

### Patterns / gradients

- No patterns or gradients specified; solid fills only.

### Buttons

- **Primary**: Background `#ff6b35`, white text. Hover: white/light bg, black text, border `#783319`.
- **Less urgent**: Background `#1f8e82` (or `#4ecdc4` per kit), white text. Hover: dark bg `#1a1a1a`, border `#1f8e82`.
- Border radius: rounded (aligned with iconography 8px).
- Shadows: none specified; flat style.

### Iconography

- **Library**: Lucide React.
- **Style**: 1.5px stroke, 8px rounded joints.
- **Suggested colors**: `#bb6eff`, `#78e200` (optional accents).

---

## 2. Proposed color palette (for implementation)

Semantic tokens stay; raw values are replaced with brand hex (then expressed as HSL in CSS).

### Dark theme (Coffee / `data-theme="turkish"`)

| Token | Hex | HSL (approx) |
|-------|-----|--------------|
| `--color-bg` | `#1a1a1a` | 0 0% 10% |
| `--color-bg-soft` | (slightly lighter) | 0 0% 12% |
| `--color-surface` | (card/panel) | 0 0% 14% |
| `--color-surface-subtle` | (chips, secondary panels) | 0 0% 18% |
| `--color-surface-elevated` | (raised) | 0 0% 22% |
| `--color-text` | `#f7f7f7` | 0 0% 97% |
| `--color-text-muted` | (secondary text) | 0 0% 75% |
| `--color-text-subtle` | (tertiary) | 0 0% 60% |
| `--color-heading` | `#ffe6dd` | 14 100% 93% |
| `--color-subheading` | `#e6fffd` | 176 100% 96% |
| `--color-accent` (primary) | `#ff6b35` | 16 100% 60% |
| `--color-accent-soft` | (hover) | 16 100% 65% |
| `--color-accent-strong` | (pressed) | 16 100% 55% |
| `--color-secondary` | `#4ecdc4` | 176 53% 65% |
| `--color-secondary-dark` | `#1f8e82` | 174 64% 34% |
| `--color-border-*` | (derived from surface) | grays from 20–45% |
| Status colors | As in table above | Mapped to semantic status tokens |

### Light theme (Mono / `data-theme="core"`)

| Token | Hex | Use |
|-------|-----|-----|
| `--color-bg` | `#f7f7f7` | Page background |
| `--color-text` | `#1a1a1a` | Body text |
| `--color-heading` | `#783319` | Headings |
| `--color-subheading` | `#1f8e82` | Sub-headings |
| `--color-accent` | `#ff6b35` | Primary (unchanged) |
| `--color-secondary` | `#4ecdc4` | Secondary |
| Surfaces/borders | Light grays | Cards, borders, subtle panels |

### Theme switching

- **Coffee** = brand dark theme (current “Turkish”).
- **Mono** = brand light theme (current “Core”).
- Toggle keeps same behavior; only the underlying CSS variables change to the palette above.

---

## 3. Proposed file changes (summary)

1. **`tailwind.config.js`**  
   - Add font families: `Inter`, `Montserrat` (with fallbacks).  
   - Extend colors with semantic tokens that reference CSS variables (including `heading`, `subheading`, `secondary`, `secondary-dark`).  
   - Keep existing semantic names; map them to the new brand variables.

2. **`src/index.css`**  
   - Define all new CSS variables (brand hex → HSL) for `:root` (dark) and `:root[data-theme='core']` (light).  
   - Set `--font-sans` to Inter for body; add `--font-heading` (Montserrat).  
   - Remove or repurpose old coffee/spice variables into the new semantic tokens.  
   - Optional: add utility classes for heading/subheading if desired.

3. **`index.html`**  
   - Load Inter and Montserrat (e.g. Google Fonts).  
   - Remove or replace `class="bg-slate-950"` so background is driven by CSS variables.

4. **Components and pages**  
   - Replace any `coffee-500`, `coffee-600`, `coffee-300`, etc. with semantic tokens: `accent`, `accent-soft`, `bg-accent`, `text-accent`, etc.  
   - Primary buttons: `bg-accent text-white` (or `text-core-white`) with hover per brand (e.g. `hover:bg-accent-soft` or border hover where specified).  
   - Secondary buttons: `bg-secondary` or `border border-secondary-dark` with appropriate text.  
   - Headings: use `font-heading` and `text-heading` where applicable.  
   - Preserve: i18n, responsive behavior, component structure, and all functionality.

5. **Theme toggle**  
   - No logic change; labels can stay “Coffee” / “Mono” (or “Dark” / “Light”).  
   - Ensure `data-theme` still switches between `turkish` (dark) and `core` (light) with the new variables.

---

## 4. What we preserve

- All functionality and routing.  
- i18n and translation keys.  
- Responsive layout and breakpoints.  
- Component and page structure.  
- Theme switch behavior (only the palettes change).

If this matches your intent, implementation will follow these points in code.
