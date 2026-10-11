# SpendWise — Budget Dashboard

A responsive dashboard shell for a personal finance app, built step-by-step across the PLP program. This is the Week 4 version, focused on layout with CSS Grid and Flexbox, a themed design system using CSS custom properties, responsive behavior, and subtle card micro-interactions.

## Built with

- HTML5 for semantic structure
- CSS Grid for the overall page layout
- Flexbox for internal arrangement (sidebar, header, cards)
- CSS custom properties for theming
- Google Fonts: Poppins for headings, Inter for body text

## Files

| File | Purpose |
| --- | --- |
| index.html | Dashboard markup — sidebar, header, summary strip, category cards |
| style.css | Layout, theming, responsive rules, and interactions |
| README.md | Project documentation |

## Layout architecture

### Page grid

The whole dashboard is a single CSS Grid with named areas:

    grid-template-columns: 240px 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "sidebar header"
      "sidebar main";

- Sidebar occupies the left column across both rows
- Header sits at the top of the right column
- Main content fills the rest

### Flexbox inside sections

- Sidebar nav uses flex column for the menu items
- Topbar uses flex with space-between to separate the title and actions
- Each card uses flex column to stack its head, body, and progress bar
- Summary strip uses flex-wrap so items collapse gracefully

## Theming with custom properties

All colors, fonts, radii, shadows, and easing are declared once on :root. Every component references those tokens, so retheming is a single-file change.

Key tokens:

- --brand: primary brand color used on buttons, active nav, card bars
- --accent: accent color for future highlights
- --bg, --surface, --surface-alt: page and container backgrounds
- --text, --text-muted: primary and secondary text colors
- --border, --brand-soft: subtle separators and hover surfaces
- --radius-sm/md/lg, --shadow-sm/md/lg: shape and elevation tokens

### Dark theme (stretch goal)

A @media (prefers-color-scheme: dark) block overrides only the :root tokens — no component rules change. The entire dashboard adapts automatically when the user's OS is in dark mode.

## Responsive behavior

A media query at 768px collapses the layout:

- Grid switches to single column
- Sidebar moves to the top and its nav becomes horizontal
- Topbar stacks its title and actions
- Summary items stack vertically
- Cards flow into a single column

Verify with the browser DevTools device toolbar (toggle device emulation).

## Card micro-interactions

Each card supports both mouse and keyboard:

- transition duration is 220ms, under the 250ms cap
- On :hover and :focus-visible, cards use transform: translateY(-4px) plus an elevated box-shadow
- :focus-visible also adds a soft ring for keyboard users
- Cards have tabindex="0" so they are reachable by keyboard

## What's on the page

- Sidebar with brand mark and six nav items
- Topbar with title, search field, notification button, and avatar
- Summary strip with three key figures
- Grid of six category cards, each showing an icon, amount, budget meta, and a progress bar

## How to view it

1. Clone or download the repository
2. Open index.html in any modern browser
3. Toggle dark mode by changing your OS appearance setting
4. Resize the window or use DevTools device emulation to test the responsive layout

## Author

Zakariye Ali Mursal
PLP 2026