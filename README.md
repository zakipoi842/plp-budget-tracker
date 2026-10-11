# SpendWise — Interactive Budget Dashboard

SpendWise is a personal finance dashboard built step-by-step across the PLP program. This is the Week 7 version, which makes the dashboard fully interactive: users can add and delete expenses through a form, the summary totals update in real time, and category cards reflect live spending.

## What SpendWise does

- Displays a responsive dashboard with a sidebar, header, summary strip, and category cards
- Lets the user add an expense via a form (name, amount, category)
- Validates input and shows an inline error message when something's wrong
- Stores each expense as an object inside an array
- Re-renders the on-page expense table, totals, and category cards every time the data changes
- Lets the user delete an individual expense
- Lets the user set or change the monthly budget
- Turns the Remaining Balance red when spending exceeds the budget

## Files

| File | Purpose |
| --- | --- |
| index.html | Dashboard markup — sidebar, header, summary, form, expense table, category cards |
| style.css | Layout, theming, responsive rules, and interaction states |
| script.js | Application state, calculations, DOM rendering, and event handlers |
| README.md | Project documentation |

## Improvements made this week

- Added a working **Add Expense form** with three fields and inline validation- Replaced the prompt-based Week 6 flow with **on-page interaction** — no more popups
- Added an **expense table** that renders from an array of records
- Added a **delete** button per row
- Added a **Set Budget** control so the user can change the monthly budget
- **Summary** and **category cards** now update live on every change
- Balance turns **red** when the user goes over budget

## How conditionals are used

Conditionals drive three key behaviors:

1. **Form validation** — `validateForm()` returns an error string when the name is empty, the amount isn't a positive number, or no category is selected. `handleAddExpense()` shows the error and stops the add.
2. **Over-budget state** — In `renderSummary()`, `if (balance < 0)` toggles the `negative` class on the balance, turning it red.
3. **Category overflow** — In `renderCategoryCards()`, `if (spent > cat.budget)` adds the `over` class to the progress bar, coloring it red.
4. **Empty state** — In `renderExpenseRows()`, `if (expenses.length === 0)` shows the "No expenses yet" message and skips rendering rows.

## How arrays are used

- `expenses` — an array of objects. Each object stores `{ id, name, amount, category, date }`.
- `CATEGORIES` — an array of category definitions with icon and budget for each.
- `findExpenseIndexById(id)` — a small loop that returns the index of a matching expense (or `-1` if not found), used by the delete handler.
- `expenses.push(newExpense)` — adds a new record.
- `expenses.splice(index, 1)` — removes one record.

Using an array of objects instead of individual variables means the app can hold any number of expenses, and every rendering function just loops over the same array.

## How the DOM is updated

Three render functions re-run after every change:

- **`renderSummary()`** — writes the budget, total spend, and remaining balance into the three summary cards. Uses `textContent` and toggles a CSS class for the over-budget color.
- **`renderExpenseRows()`** — clears the table body with `innerHTML = ""` and rebuilds a `<tr>` per expense using `document.createElement`, `textContent`, and `appendChild`.
- **`renderCategoryCards()`** — rebuilds every category card with a fresh amount, meta text, and progress bar width based on the current data.

`renderAll()` calls all three so the page always matches the data.

## How user interactions are handled

Three event listeners wire up the app:

- `form.addEventListener("submit", handleAddExpense)` — reads the inputs, validates them, pushes a new object into `expenses`, resets the form, and re-renders.
- `rowsContainer.addEventListener("click", handleDeleteExpense)` — uses event delegation. It checks whether the click was on a delete button, then removes the matching expense from the array.
- `setBudgetBtn.addEventListener("click", handleSetBudget)` — reads the budget input, validates it, updates `monthlyBudget`, and re-renders.

Every handler follows the same pattern: **read input → validate → update state → re-render**.

## Event flow — a full round trip

1. User types "Groceries", "2500", selects "Food"
2. Clicks **Add Expense**
3. `submit` fires on the form → `handleAddExpense` runs
4. Reads the input values, validates them
5. Creates an object and pushes it to `expenses`
6. Form is reset, success message shown
7. `renderAll()` re-runs the three render functions
8. Summary totals update, new row appears in the table, category card for Food increases

## Challenges and how they were resolved

- **Avoiding duplicate event listeners on re-render:** row-specific buttons could have had their own listeners. Instead, one listener on the table body uses `event.target.closest(".delete-btn")` to detect clicks on any delete button — event delegation.
- **Preventing the form from reloading the page:** a plain `<form>` submit reloads the page by default. Calling `event.preventDefault()` inside `handleAddExpense` stops that.
- **Keeping the page in sync with the data:** rather than editing individual DOM nodes, every change triggers a full re-render from the `expenses` array. Simple to reason about, and the DOM is always consistent with the data.
- **Validating numbers from `<input type="number">`:** empty fields return `""`, and `parseFloat("")` is `NaN`. The validator checks `isNaN(amount) || amount <= 0` to catch both.
- **Persisting records with an id:** `Date.now()` provides a unique id per record, which the delete handler uses to find the right entry.

## How to run it

1. Clone or download the repository
2. Open `index.html` in any modern browser
3. Set a monthly budget using the input under the Add Expense form
4. Add expenses by filling in Name, Amount, and Category, then clicking Add Expense
5. Watch the summary and category cards update
6. Click ✕ on any row to delete that expense
7. Open DevTools (`F12`) if you want to inspect the state

## Project structure

    budget-tracker/
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md

## Author

Zakariye Ali Mursal
PLP 2026