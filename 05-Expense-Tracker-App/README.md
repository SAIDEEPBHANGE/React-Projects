# Expense Tracker

A responsive React and Bootstrap app for tracking monthly income, expenses,
budgets, and category spending in Indian rupees.

## Run locally

```sh
npm install
npm run dev
```

Run `node --test tests/*.test.js`, `npm run lint`, and `npm run build` to
validate. Data is stored in this
browser's localStorage; clearing browser data removes it. Select a month in
the current April–March financial year. Transactions are saved to the selected
month, regardless of the date entered. CSV export includes all transactions
in that month, not just search results.

## Function flow

```mermaid
flowchart TD
  Start[Open app] --> Load[Load selected month from localStorage]
  Load --> Show[Calculate summary and show transactions]
  Show --> Action{User action}
  Action -->|Choose month| Load
  Action -->|Add, delete, or change budget| Save[Save updated month]
  Save --> Show
  Action -->|Search or paginate| Filter[Filter and display rows]
  Action -->|Export| CSV[Download monthly CSV]
```

## Component flow

```mermaid
flowchart TD
  App --> Header[Header: month selection]
  App --> Summary[Summary: totals and budget]
  App --> Form[TransactionForm: add income or expense]
  App --> Chart[ExpenseChart: category breakdown]
  App --> Table[TransactionTable: search, pages, delete, export]
  App --> Storage[Storage and CSV utilities]
```

## React concepts through real-life analogies

- **Components** are like rooms in a house: each has a focused purpose.
- **Props** are like instructions passed from a manager to a team member.
- **State** is like a whiteboard: changing it updates what everyone sees.
- **Events** are like doorbells: a click or submission triggers an action.
- **Controlled inputs** are like a shared notepad: React keeps the displayed
  form values in sync with its state.
- **Effects** are like an artist repainting a chart when its data changes.
- **List keys** are like name tags, helping React identify each transaction.

The chart uses a canvas for the pie and a text legend for accessible values;
Bootstrap's responsive grid and table handle smaller screens.
