# SpendWise — Budget Dashboard

SpendWise is a personal finance dashboard built step-by-step across the PLP program. This is the Week 6 version, which adds a JavaScript foundation to the Week 4 dashboard shell: variables, user input, calculations, and reusable functions.

## What SpendWise does

- Displays a responsive dashboard with a sidebar, header, summary strip, and six category cards
- Prompts the user for a monthly budget and a series of expense amounts
- Adds up expenses and calculates the remaining balance
- Prints a clearly labeled report to the browser's developer console
- Will eventually render live data into the dashboard cards in a later week

## Files

| File | Purpose |
| --- | --- |
| index.html | Dashboard markup and the script tag that loads script.js |
| style.css | Layout, theming, and responsive rules (unchanged from Week 4) |
| script.js | All JavaScript logic — variables, input, calculations, functions |
| README.md | Project documentation |

## JavaScript concepts implemented

### 1. Variables and data types

- `let monthlyBudget` — number set from user input
- `const expenseAmounts` — array of numbers collected from the user
- `let totalExpenses` — number computed from the array
- `let remainingBalance` — number computed after totals
- `const currency` — string used when formatting output
- `const categories` — array of category names the app asks about

`let` is used for values that change; `const` is used for values that do not get reassigned.

### 2. User input

- `prompt()` asks the user for the budget and each expense
- `parseFloat()` converts the string returned by prompt into a number
- `isNaN()` and simple range checks validate input
- Invalid input triggers `alert()` and retries the same prompt
- An empty response ends the expense-entry loop

### 3. Calculations

- `sumArray(amounts)` adds every number in an array with a for loop
- `calculateBalance(budget, expenses)` returns `budget - expenses`
- `getBalanceStatus(balance)` returns a short status message based on the sign of the balance
- `formatCurrency(amount)` produces a readable string like `KSh 12,500`

### 4. Reusable functions

Each function has a single responsibility:

- `askForBudget()` — collect and validate the monthly budget
- `askForExpense(label)` — collect and validate a single expense
- `sumArray(amounts)` — sum an array
- `calculateBalance(budget, expenses)` — compute the remaining balance
- `getBalanceStatus(balance)` — describe the balance in words
- `formatCurrency(amount)` — format a number as currency
- `printReport()` — print the labeled report to the console
- `runBudgetTracker()` — orchestrate the whole flow

Splitting the logic this way keeps each function small, easy to read, and easy to test.

## How to run it

1. Clone or download the repository
2. Open `index.html` in any modern browser
3. The page loads; a series of prompts appears asking for your budget and each expense
4. Leave a prompt blank to finish entering expenses
5. Open DevTools (`F12`) and switch to the **Console** tab to see the labeled report

## Project structure
