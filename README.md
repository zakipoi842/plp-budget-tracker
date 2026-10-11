# My Budget Tracker

A Personal Budget & Expense Tracker built step-by-step across the PLP program. This is the Week 3 version, focused on visual identity — a cohesive color palette, Google Fonts typography, polished table and form styling, and intentional use of the CSS box model.

## Built with

- HTML5 for semantic structure, tables, forms, and multimedia
- CSS3 for custom properties, advanced selectors, and box model layout
- Google Fonts: Poppins for headings, Inter for body text

## Files

| File | Purpose |
| --- | --- |
| index.html | Page structure — header, form, table, help section, video |
| style.css | All styling — design tokens, typography, table and form styling |
| README.md | Project documentation |

## Visual identity

### Color palette

Defined as CSS custom properties under :root in style.css so the whole design can be retuned from one place.

| Token | Value | Used for |
| --- | --- | --- |
| --primary | #4F46E5 | Headings, buttons, table header |
| --primary-dark | #3730A3 | Button hover, emphasized text |
| --primary-soft | #EEF2FF | Hover highlights, focus rings |
| --bg | #F9FAFB | Page background |
| --surface | #FFFFFF | Cards |
| --stripe | #F3F4F6 | Alternating table rows |
| --text | #111827 | Body text |
| --text-muted | #6B7280 | Subtitle and helper text |
| --border | #E5E7EB | Card and input borders |

### Typography

- Headings: Poppins (weights 500 to 700)
- Body: Inter (weights 400 to 600)

Both are loaded via Google Fonts link tags in the head of index.html.

## What's on the page

### 1. Page header card

- Logo image with a circular frame
- Main heading and subtitle
- White card with border, border-radius, padding, and a subtle shadow

### 2. Add Expense card

- Form with three labeled fields: Name, Amount, Category
- Category is a select dropdown with five options
- Inputs have padding, rounded corners, and a focus ring
- Primary-colored Add Expense button with hover and active states

### 3. Expenses table card

- Table with thead and tbody
- Header row in primary color with uppercase labels
- Alternating row colors using tbody tr:nth-child(even)
- Row hover highlight
- Amount column emphasized with heavier weight and darker tone

### 4. Help section

- Collapsible details and summary panel
- Warm accent styling to distinguish it from the main cards

### 5. Video section

- YouTube iframe embed, responsive and rounded

## CSS Box Model in practice

Every major section is a card using the same pattern:

- margin separates each card vertically
- padding creates internal breathing room
- border and border-radius define the card shape
- box-shadow adds subtle elevation from the page background

## Responsive behavior

A media query at max-width 600px adjusts page padding, card padding, border radius, heading sizes, and table cell padding for mobile.

## CSS techniques used

### Custom properties

Colors, fonts, radii, and shadows are stored as tokens in :root.

### Element selectors

body, h1, h2, p, label, input, select, table

### Class selectors

.add-expense, .input-group, .help-section, .video-section, .subtitle, .table-wrapper, .expenses-section

### ID selectors

#page-header, #expenses-list, #add-expense-btn

### Advanced selectors

- Descendant: .expenses-section h2
- Direct child: .add-expense > form > .input-group
- Positional: tbody tr:nth-child(even), tbody tr:last-child, tbody td:nth-child(2)
- Negation: input:not([type="submit"])
- Focus: input:focus, select:focus
- Hover: tbody tr:hover, #add-expense-btn:hover

## How to view it

1. Clone or download the repository
2. Open index.html in any modern browser
3. No build step, no dependencies

## Author

Zakariye Ali Mursal
PLP 2026