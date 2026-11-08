import { useState } from "react";
import { money } from "../utils/categories";

export default function Summary({ data, onBudget }) {
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState("");
  const income = data.transactions.reduce((sum, t) => sum + (t.type === "Income" ? t.amount : 0), 0);
  const expense = data.transactions.reduce((sum, t) => sum + (t.type === "Expense" ? t.amount : 0), 0);
  const cards = [
    ["Income", income, "success", "arrow-down-circle"],
    ["Expenses", expense, "danger", "arrow-up-circle"],
    ["Balance", income - expense, "primary", "wallet2"],
  ];
  const save = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (amount !== "" && Number.isFinite(value) && value >= 0 && onBudget(value)) setEditing(false);
  };
  return (
    <section className="row g-3 mb-4" aria-label="Monthly summary">
      {cards.map(([label, value, color, icon]) => (
        <div className="col-sm-6 col-xl-3" key={label}>
          <div className="card border-0 shadow-sm h-100"><div className="card-body">
            <div className="d-flex justify-content-between text-body-secondary">
              <span>{label}</span><i className={`bi bi-${icon} text-${color}`} aria-hidden="true" />
            </div><p className={`h4 mt-3 mb-0 text-${color}`}>{money(value)}</p>
          </div></div>
        </div>
      ))}
      <div className="col-sm-6 col-xl-3"><div className="card border-0 shadow-sm h-100"><div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-body-secondary">Monthly budget</span>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { setAmount(String(data.budget)); setEditing(!editing); }} aria-label="Edit budget">
            <i className="bi bi-pencil" aria-hidden="true" />
          </button>
        </div>
        {editing ? <form onSubmit={save} className="input-group mt-2">
          <input aria-label="Budget in rupees" className="form-control" type="number" min="0" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button className="btn btn-primary">Save</button>
        </form> : <p className="h4 mt-3 mb-0">{money(data.budget)}</p>}
        {data.budget > 0 && <small className={expense > data.budget ? "text-danger" : "text-body-secondary"}>
          {expense > data.budget ? "Over budget by " + money(expense - data.budget) : money(data.budget - expense) + " remaining"}
        </small>}
      </div></div></div>
    </section>
  );
}
