import { useState } from "react";
import { categories } from "../utils/categories";
import { todayString } from "../utils/months";

const initialForm = () => ({ title: "", amount: "", date: todayString(), type: "Income", category: "Salary" });

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const change = (field, value) => setForm((previous) => ({ ...previous, [field]: value }));
  const submit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!form.title.trim() || !Number.isFinite(amount) || amount <= 0 || !form.date) {
      setError("Enter a title, a positive amount and a date."); return;
    }
    const transaction = { ...form, title: form.title.trim(), amount };
    if (onAdd(transaction)) { setForm(initialForm()); setError(""); }
  };
  return (
    <section className="card border-0 shadow-sm h-100"><div className="card-body p-4">
      <h2 className="h5 mb-3"><i className="bi bi-plus-circle me-2 text-primary" aria-hidden="true" />Add transaction</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <form onSubmit={submit} className="row g-3">
        <div className="col-12"><label htmlFor="title" className="form-label">Title</label>
          <input id="title" className="form-control" required value={form.title} onChange={(e) => change("title", e.target.value)} placeholder="e.g. Grocery shopping" /></div>
        <div className="col-sm-6"><label htmlFor="amount" className="form-label">Amount (₹)</label>
          <input id="amount" className="form-control" type="number" min="0.01" step="0.01" required value={form.amount} onChange={(e) => change("amount", e.target.value)} /></div>
        <div className="col-sm-6"><label htmlFor="date" className="form-label">Date</label>
          <input id="date" className="form-control" type="date" required value={form.date} onChange={(e) => change("date", e.target.value)} /></div>
        <div className="col-sm-6"><label htmlFor="type" className="form-label">Type</label>
          <select id="type" className="form-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value, category: categories[e.target.value][0] })}>
            <option>Income</option><option>Expense</option>
          </select></div>
        <div className="col-sm-6"><label htmlFor="category" className="form-label">Category</label>
          <select id="category" className="form-select" value={form.category} onChange={(e) => change("category", e.target.value)}>
            {categories[form.type].map((category) => <option key={category}>{category}</option>)}
          </select></div>
        <div className="col-12"><button className="btn btn-primary w-100"><i className="bi bi-plus-lg me-2" aria-hidden="true" />Add transaction</button></div>
      </form>
    </div></section>
  );
}
