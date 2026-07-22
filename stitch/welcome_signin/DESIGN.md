---
name: Iron Precision
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393f'
  surface-container-lowest: '#0c0e13'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2025'
  surface-container-high: '#282a2f'
  surface-container-highest: '#33353a'
  on-surface: '#e2e2e9'
  on-surface-variant: '#d7c3b0'
  inverse-surface: '#e2e2e9'
  inverse-on-surface: '#2e3036'
  outline: '#a08e7c'
  outline-variant: '#524436'
  surface-tint: '#ffb964'
  primary: '#ffc482'
  on-primary: '#482a00'
  primary-container: '#f2a33c'
  on-primary-container: '#653d00'
  inverse-primary: '#875300'
  secondary: '#c4c6cf'
  on-secondary: '#2d3038'
  secondary-container: '#464951'
  on-secondary-container: '#b6b8c1'
  tertiary: '#93d8ff'
  on-tertiary: '#003549'
  tertiary-container: '#4fbff4'
  on-tertiary-container: '#004b67'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddba'
  primary-fixed-dim: '#ffb964'
  on-primary-fixed: '#2b1700'
  on-primary-fixed-variant: '#663e00'
  secondary-fixed: '#e0e2eb'
  secondary-fixed-dim: '#c4c6cf'
  on-secondary-fixed: '#191c22'
  on-secondary-fixed-variant: '#44474e'
  tertiary-fixed: '#c3e8ff'
  tertiary-fixed-dim: '#79d1ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c68'
  background: '#111318'
  on-background: '#e2e2e9'
  surface-variant: '#33353a'
typography:
  display-lg:
    fontFamily: Barlow Condensed
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Barlow Condensed
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 28px
  headline-md:
    fontFamily: Barlow Condensed
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  metric-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The design system is engineered for high-performance strength training, prioritizing utility, power, and focus. It adopts a **Modern Industrial** aesthetic—often referred to as the "Iron-gym" look—characterized by high-contrast typography and a dense, functional layout.

The target audience consists of dedicated athletes and bodybuilders who require a "Control Center" for their physical data. The emotional response is one of serious intent and reliability. Visual clutter is eliminated to ensure that during high-intensity training, the only thing visible is the data that matters: weights, reps, and timers. 

The style utilizes structured grids, atmospheric dark surfaces, and a singular high-energy accent color to guide the eye toward critical actions.

## Colors

The palette is anchored in a deep **Dark Gunmetal** (#1A1C21) for the global background, providing a low-light environment that reduces eye strain in gym settings. 

- **Primary Accent:** Amber (#F2A33C) is reserved exclusively for interactive elements, progress indicators, and primary CTAs. It should feel like a "glow" against the industrial background.
- **Surface Layers:** Charcoal (#25282F) is used for cards and containers to create subtle separation from the background.
- **Typography:** Pure white is used for headings and critical metrics. Muted slate-grey is used for labels and secondary descriptions to maintain a clear visual hierarchy.
- **Dividers:** Use subtle dashed lines in `#334155` with 15% opacity for rhythmic separation of list items.

## Typography

Typography is the backbone of this design system’s "Iron-gym" aesthetic. 

1.  **Headlines:** Use **Barlow Condensed** in Bold or Extra Bold. All headlines must be **Uppercase** to evoke the feeling of weight-room signage and athletic branding.
2.  **Body Text:** Use **Inter** for readability. It provides a clean, neutral balance to the aggressive nature of the headlines.
3.  **Metrics (Weights/Reps):** Use **JetBrains Mono** or a similar monospaced font for all numerical data. This ensures "Tabular Numbers" alignment, preventing the UI from jumping when numbers change during tracking.
4.  **Scaling:** For mobile, reduce display sizes by roughly 15% but maintain the tight line-height to keep the "heavy" look.

## Layout & Spacing

The layout follows a strict **4px baseline grid** to maintain industrial precision. 

- **Grid System:** A fluid 12-column grid is used for desktop/tablet, collapsing to a single column with 20px side margins on mobile.
- **Density:** The design favors a "Compact-to-Comfortable" density. Metrics are packed tightly to allow more data on-screen, but touch targets for logging reps and weights are never smaller than **48px x 48px**.
- **Bottom Navigation:** A persistent bar at the bottom of the screen houses 4 primary tabs (Train, Program, Food, Progress), ensuring the core utility is always one thumb-press away.

## Elevation & Depth

Depth is achieved through **Tonal Layering** rather than traditional drop shadows. This keeps the interface feeling "flat" and "grounded" like gym equipment.

1.  **Level 0 (Base):** Dark Gunmetal (#1A1C21). Used for the main canvas.
2.  **Level 1 (Cards):** Charcoal (#25282F). These surfaces should have a 1px solid border of `#334155` to define edges against the background.
3.  **Level 2 (Active/Floating):** Use a subtle 8px blur shadow with 40% opacity of the background color for elements like floating "Add Exercise" buttons. 
4.  **Dividers:** Within cards, use dashed lines (2px dash, 2px gap) for secondary sectioning.

## Shapes

The shape language is "Calculated Softness." Elements are predominantly rectangular but softened just enough to feel modern and premium.

- **Cards & Containers:** Fixed 12px corner radius.
- **Buttons:** 8px corner radius for a more rigid, "tool-like" feel.
- **Input Fields:** 8px corner radius.
- **Selection Chips:** Semi-pill (16px) to distinguish them from structural cards.

## Components

- **Primary Buttons:** Amber (#F2A33C) background with Black (#000000) text. Use Barlow Condensed Bold Uppercase. High tactile response on press.
- **Secondary Buttons:** Outline style using the primary Amber color for the border and text.
- **Weight/Rep Inputs:** Large, center-aligned monospaced text within Charcoal cards. Include large "+" and "-" stepper buttons on the flanks for easy adjustment with sweaty hands.
- **Progress Bars:** Thin, high-contrast tracks. The "filled" portion should use the Amber accent.
- **Cards:** Used for workout blocks. Should feature a header with the exercise name in Barlow Condensed and a list of sets separated by the dashed dividers.
- **Bottom Navigation:** Solid Charcoal background with a 1px top border. Active icons/labels transition to Amber; inactive states are Muted Grey.
- **Status Chips:** Small, condensed labels for "Personal Record" (Amber background) or "Completed" (Success Green).