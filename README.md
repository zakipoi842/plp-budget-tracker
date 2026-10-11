# My Budget Tracker

A simple Personal Budget & Expense Tracker built as a week-by-week project for the PLP program. This is the **Week 2 version**, which builds on the Week 1 skeleton by adding a structured expense table, an upgraded form, multimedia content, and advanced CSS selectors.

## Built with

- **HTML5** — semantic structure, tables, forms, multimedia embeds
- **CSS3** — element, class, and ID selectors; pseudo-classes; advanced combinators

## Files

| File | Purpose |
|---|---|
| `index.html` | The page structure — header, add-expense form, expenses table, help section, and embedded video |
| `style.css` | All styling — base layout, table styling, form styling, hover and focus states |
| `README.md` | This file |

## What's on the page

### 1. Page header
- Site logo (`<img>` with `src`, `alt`, and `width` attributes)
- Main heading: "My Budget Tracker"
- Subtitle describing the site's purpose

### 2. Add Expense form
- Wrapped in a proper `<form>` element
- **Expense Name** — text input (`id="expense-name"`)
- **Amount** — number input (`id="expense-amount"`)
- **Category** — `<select>` dropdown with 5 options: Food, Transport, Rent, Entertainment, Other (`id="expense-category"`)
- **Add Expense** button (`type="button"`) — non-functional for now; wired up in Week 6

### 3. Your Expenses table
- Structured with `<table>`, `<thead>`, `<tbody>`
- Column headers: Name, Amount, Category, Date
- Five rows of sample hardcoded data
- Styled with `border-collapse: collapse`, cell padding, a colored header row, and alternating row colors

### 4. Collapsible help section
- Uses `<details>` and `<summary>` for a "How to use this tracker" panel
- Native HTML — no JavaScript required

### 5. Embedded video
- YouTube `<iframe>` with `width`, `height`, `title`, and `frameborder` attributes set

## CSS techniques used

### Basic selectors
- **Element selectors** — `body`, `h1`, `h2`, `input`, `select`, `table`, `th`, `td`
- **Class selectors** — `.add-expense`, `.input-group`, `.help-section`, `.video-section`, `.subtitle`
- **ID selectors** — `#page-header`, `#expenses-list`, `#add-expense-btn`

### Advanced selectors (Week 2 requirement)
- **Descendant selector** — `.expenses-section td`
- **Direct child selector** — `.add-expense > form > .input-group`
- **Positional pseudo-class** — `tbody tr:nth-child(even)`, `tbody tr:first-child td`
- **Negation pseudo-class** — `input:not([type="submit"])`
- **Focus state** — `input:focus, select:focus`
- **Hover state** — `tbody tr:hover`, `#add-expense-btn:hover`

## How to view it

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. No build step, no dependencies — just plain HTML and CSS

## What's coming next

- **Week 3+** — More advanced layout and responsive design
- **Week 6** — JavaScript to make the form functional and render expenses dynamically
- **Week 7+** — Persistence with `localStorage`, editing and deleting expenses

## Author

**Zakariye Ali Mursal**
PLP 2026