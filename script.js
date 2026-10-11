/* ============================================================
   SpendWise — Budget Foundation (Week 6)
   ------------------------------------------------------------
   Concepts covered this week:
   - Variables and data types
   - User input with prompt()
   - Calculations
   - Reusable functions
   - Console output
   ============================================================ */

/* ------------------------------------------------------------
   1. STORE APPLICATION DATA
   ------------------------------------------------------------ */

// Starting budget (will be replaced by user input)
let monthlyBudget = 0;

// Array of expense amounts entered by the user
const expenseAmounts = [];

// Computed totals
let totalExpenses = 0;
let remainingBalance = 0;

// String constant for currency formatting
const currency = "KSh";

// Fixed list of categories the app asks about
const categories = [
  "Food",
  "Transport",
  "Rent",
  "Entertainment",
  "Savings",
  "Utilities"
];

/* ------------------------------------------------------------
   2. REUSABLE FUNCTIONS
   ------------------------------------------------------------ */

/**
 * Format a number as currency, e.g. 12500 -> "KSh 12,500"
 */
function formatCurrency(amount) {
  return currency + " " + amount.toLocaleString();
}

/**
 * Sum every number in an array.
 */
function sumArray(amounts) {
  let total = 0;
  for (let i = 0; i < amounts.length; i++) {
    total += amounts[i];
  }
  return total;
}

/**
 * Compute remaining balance.
 */
function calculateBalance(budget, expenses) {
  return budget - expenses;
}

/**
 * Return a short status message based on the remaining balance.
 */
function getBalanceStatus(balance) {
  if (balance > 0) {
    return "You are within budget.";
  } else if (balance === 0) {
    return "You have used your entire budget.";
  } else {
    return "You are over budget.";
  }
}

/**
 * Ask the user for a monthly budget and validate it.
 */
function askForBudget() {
  const input = prompt("What is your total budget for this month? (numbers only)");
  const parsed = parseFloat(input);

  if (isNaN(parsed) || parsed <= 0) {
    alert("Please enter a valid positive number for your budget.");
    return askForBudget();
  }

  return parsed;
}

/**
 * Ask the user for one expense amount. Blank input ends the loop.
 */
function askForExpense(label) {
  const input = prompt(
    'Enter the amount for "' + label + '" (or leave blank to finish):'
  );

  if (input === null || input.trim() === "") {
    return null;
  }

  const parsed = parseFloat(input);

  if (isNaN(parsed) || parsed < 0) {
    alert("Please enter a valid number, or leave blank to finish.");
    return askForExpense(label);
  }

  return parsed;
}

/**
 * Print a clearly labeled report to the console.
 */
function printReport() {
  console.log("==============================================");
  console.log("  SpendWise — Budget Report");
  console.log("==============================================");
  console.log("Total Budget:      " + formatCurrency(monthlyBudget));
  console.log("Total Expenses:    " + formatCurrency(totalExpenses));
  console.log("Remaining Balance: " + formatCurrency(remainingBalance));
  console.log("Status:            " + getBalanceStatus(remainingBalance));
  console.log("Expenses entered:  " + expenseAmounts.length);
  console.log("==============================================");
}

/* ------------------------------------------------------------
   3. MAIN PROGRAM FLOW
   ------------------------------------------------------------ */

function runBudgetTracker() {
  console.log("SpendWise — starting budget tracker...");

  // Step 1: get the budget
  monthlyBudget = askForBudget();
  console.log("Budget entered: " + formatCurrency(monthlyBudget));

  // Step 2: loop through categories and collect expenses
  for (let i = 0; i < categories.length; i++) {
    const label = categories[i];
    const amount = askForExpense(label);

    if (amount === null) {
      console.log("User ended expense entry early.");
      break;
    }

    expenseAmounts.push(amount);
    console.log("  - " + label + ": " + formatCurrency(amount));
  }

  // Step 3: calculate totals
  totalExpenses = sumArray(expenseAmounts);
  remainingBalance = calculateBalance(monthlyBudget, totalExpenses);

  // Step 4: print the report
  printReport();
}

/* ------------------------------------------------------------
   4. RUN IT
   ------------------------------------------------------------ */

runBudgetTracker();