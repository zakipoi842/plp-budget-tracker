/* ============================================================
   SpendWise — Interactive Dashboard (Week 7)
   ------------------------------------------------------------
   Concepts covered this week:
   - Conditionals (validation, budget status, empty state)
   - Arrays of objects (multiple expense records)
   - Loops (summing, rendering rows)
   - DOM manipulation (updating the page)
   - Event listeners (form submit, delete, set budget)
   ============================================================ */

/* ------------------------------------------------------------
   1. APPLICATION STATE
   ------------------------------------------------------------ */

// Array of expense objects. Each: { id, name, amount, category, date }
const expenses = [];

// Default monthly budget — can be changed by the user
let monthlyBudget = 50000;

// Currency label
const CURRENCY = "KSh";

// Categories the dashboard tracks
const CATEGORIES = [
  { name: "Food",          icon: "🍔", budget: 10000 },
  { name: "Transport",     icon: "🚌", budget: 4000  },
  { name: "Rent",          icon: "🏠", budget: 15000 },
  { name: "Entertainment", icon: "🎬", budget: 3000  },
  { name: "Savings",       icon: "💰", budget: 8000  },
  { name: "Utilities",     icon: "💡", budget: 4500  }
];

/* ------------------------------------------------------------
   2. HELPERS
   ------------------------------------------------------------ */

function formatCurrency(amount) {
  const rounded = Math.round(amount);
  return CURRENCY + " " + rounded.toLocaleString();
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function findExpenseIndexById(id) {
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id === id) {
      return i;
    }
  }
  return -1;
}

/* ------------------------------------------------------------
   3. CALCULATIONS
   ------------------------------------------------------------ */

function calculateTotalSpent(list) {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    total += list[i].amount;
  }
  return total;
}

function calculateTotalPerCategory(list, category) {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].category === category) {
      total += list[i].amount;
    }
  }
  return total;
}

/* ------------------------------------------------------------
   4. DOM REFERENCES
   ------------------------------------------------------------ */

const form          = document.getElementById("expense-form");
const nameInput     = document.getElementById("expense-name");
const amountInput   = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const formMessage   = document.getElementById("form-message");
const rowsContainer = document.getElementById("expense-rows");
const emptyMessage  = document.getElementById("empty-message");
const cardsContainer = document.getElementById("category-cards");

const summaryBudget  = document.getElementById("summary-budget");
const summarySpend   = document.getElementById("summary-spend");
const summaryBalance = document.getElementById("summary-balance");

const budgetInput = document.getElementById("budget-input");
const setBudgetBtn = document.getElementById("set-budget-btn");

/* ------------------------------------------------------------
   5. RENDER FUNCTIONS
   ------------------------------------------------------------ */

function renderSummary() {
  const totalSpent = calculateTotalSpent(expenses);
  const balance = monthlyBudget - totalSpent;

  summaryBudget.textContent  = formatCurrency(monthlyBudget);
  summarySpend.textContent   = formatCurrency(totalSpent);
  summaryBalance.textContent = formatCurrency(balance);

  // Conditional styling: red balance when negative
  if (balance < 0) {
    summaryBalance.classList.add("negative");
  } else {
    summaryBalance.classList.remove("negative");
  }
}

function renderExpenseRows() {
  // Clear the tbody
  rowsContainer.innerHTML = "";

  // Show or hide the empty-state message
  if (expenses.length === 0) {
    emptyMessage.classList.remove("hidden");
    return;
  }
  emptyMessage.classList.add("hidden");

  // Loop through the array and build a row per expense
  for (let i = 0; i < expenses.length; i++) {
    const item = expenses[i];
    const tr = document.createElement("tr");

    // Column 1: name
    const nameTd = document.createElement("td");
    nameTd.textContent = item.name;
    nameTd.setAttribute("data-label", "Name");
    tr.appendChild(nameTd);

    // Column 2: amount
    const amountTd = document.createElement("td");
    amountTd.textContent = formatCurrency(item.amount);
    amountTd.setAttribute("data-label", "Amount");
    tr.appendChild(amountTd);

    // Column 3: category
    const categoryTd = document.createElement("td");
    categoryTd.textContent = item.category;
    categoryTd.setAttribute("data-label", "Category");
    tr.appendChild(categoryTd);

    // Column 4: date
    const dateTd = document.createElement("td");
    dateTd.textContent = item.date;
    dateTd.setAttribute("data-label", "Date");
    tr.appendChild(dateTd);

    // Column 5: delete button
    const actionsTd = document.createElement("td");
    actionsTd.setAttribute("data-label", "");
    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.className = "delete-btn";
    delBtn.setAttribute("aria-label", "Delete expense");
    delBtn.dataset.id = item.id;
    actionsTd.appendChild(delBtn);
    tr.appendChild(actionsTd);

    rowsContainer.appendChild(tr);
  }
}

function renderCategoryCards() {
  cardsContainer.innerHTML = "";

  for (let i = 0; i < CATEGORIES.length; i++) {
    const cat = CATEGORIES[i];
    const spent = calculateTotalPerCategory(expenses, cat.name);
    const pct = cat.budget > 0 ? Math.min((spent / cat.budget) * 100, 100) : 0;
    const isOver = spent > cat.budget;

    const article = document.createElement("article");
    article.className = "card";
    article.tabIndex = 0;

    article.innerHTML =
      '<div class="card-head">' +
        '<span class="card-icon" aria-hidden="true">' + cat.icon + '</span>' +
        '<span class="card-title">' + cat.name + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<span class="card-amount">' + formatCurrency(spent) + '</span>' +
        '<span class="card-meta">of ' + formatCurrency(cat.budget) + ' budget</span>' +
      '</div>' +
      '<div class="card-bar"><span class="' + (isOver ? "over" : "") + '" style="width: ' + pct + '%"></span></div>';

    cardsContainer.appendChild(article);
  }
}

function renderAll() {
  renderSummary();
  renderExpenseRows();
  renderCategoryCards();
}

/* ------------------------------------------------------------
   6. VALIDATION (conditionals)
   ------------------------------------------------------------ */

function validateForm(name, amount, category) {
  if (name.trim() === "") {
    return "Please enter an expense name.";
  }
  if (isNaN(amount) || amount <= 0) {
    return "Please enter a valid amount greater than 0.";
  }
  if (category === "") {
    return "Please choose a category.";
  }
  return null; // no error
}

function showFormMessage(text, isSuccess) {
  formMessage.textContent = text;
  if (isSuccess) {
    formMessage.classList.add("success");
  } else {
    formMessage.classList.remove("success");
  }
}

/* ------------------------------------------------------------
   7. EVENT HANDLERS
   ------------------------------------------------------------ */

function handleAddExpense(event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value;
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  const error = validateForm(name, amount, category);
  if (error) {
    showFormMessage(error, false);
    return;
  }

  // Create a new record and store it in the array
  const newExpense = {
    id: Date.now().toString(),
    name: name.trim(),
    amount: amount,
    category: category,
    date: todayISO()
  };

  expenses.push(newExpense);

  // Reset the form
  form.reset();
  showFormMessage("Expense added.", true);
  nameInput.focus();

  // Update the page
  renderAll();
}

function handleDeleteExpense(event) {
  const button = event.target.closest(".delete-btn");
  if (!button) return;

  const id = button.dataset.id;
  const index = findExpenseIndexById(id);

  if (index === -1) return;

  expenses.splice(index, 1);
  renderAll();
  showFormMessage("Expense removed.", true);
}

function handleSetBudget() {
  const value = parseFloat(budgetInput.value);

  if (isNaN(value) || value <= 0) {
    showFormMessage("Please enter a valid budget amount.", false);
    return;
  }

  monthlyBudget = value;
  budgetInput.value = "";
  showFormMessage("Budget updated to " + formatCurrency(value) + ".", true);
  renderAll();
}

/* ------------------------------------------------------------
   8. WIRE UP EVENT LISTENERS
   ------------------------------------------------------------ */

form.addEventListener("submit", handleAddExpense);
rowsContainer.addEventListener("click", handleDeleteExpense);
setBudgetBtn.addEventListener("click", handleSetBudget);

/* ------------------------------------------------------------
   9. INITIAL RENDER
   ------------------------------------------------------------ */

renderAll();