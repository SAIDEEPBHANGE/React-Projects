import { useState } from "react";
import { money } from "../utils/categories";

const perPage = 5;

export default function TransactionTable({ transactions, onDelete, onExport }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const filtered = transactions.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
  const pages = Math.ceil(filtered.length / perPage);
  const current = Math.min(page, Math.max(pages, 1));
  const start = (current - 1) * perPage;
  return (
    <section className="card border-0 shadow-sm"><div className="card-body p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        <h2 className="h5 mb-0">Transactions <span className="badge text-bg-light">{filtered.length} total</span></h2>
        <div className="d-flex flex-wrap gap-2">
          <input type="search" className="form-control w-auto" aria-label="Search transaction titles" placeholder="Search title" value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          <button type="button" className="btn btn-outline-secondary" onClick={() => { setSearch(""); setPage(1); }}>Clear</button>
          <button type="button" className="btn btn-outline-primary" onClick={onExport}><i className="bi bi-download me-2" aria-hidden="true" />Export CSV</button>
        </div>
      </div>
      <div className="table-responsive"><table className="table align-middle">
        <thead><tr><th scope="col">Title</th><th scope="col">Category</th><th scope="col">Type</th><th scope="col">Amount</th><th scope="col">Date</th><th scope="col">Action</th></tr></thead>
        <tbody>
          {filtered.slice(start, start + perPage).map((t) => <tr key={t.id}>
            <td className="fw-semibold">{t.title}</td>
            <td><span className={`badge ${t.type === "Income" ? "text-bg-success" : "text-bg-danger"}`}>{t.category}</span></td>
            <td>{t.type}</td><td className={t.type === "Income" ? "text-success" : "text-danger"}>{t.type === "Income" ? "+" : "-"}{money(t.amount)}</td>
            <td>{t.date}</td><td><button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(t.id)} aria-label={`Delete ${t.title}`}>
              <i className="bi bi-trash" aria-hidden="true" /></button></td>
          </tr>)}
          {!filtered.length && <tr><td colSpan="6" className="text-center text-body-secondary py-4">No transactions found for this period.</td></tr>}
        </tbody>
      </table></div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
        <small className="text-body-secondary">Showing {filtered.length ? start + 1 : 0}–{Math.min(start + perPage, filtered.length)} of {filtered.length} items</small>
        {pages > 1 && <div className="btn-group" role="group" aria-label="Transaction pages">
          <button type="button" className="btn btn-outline-secondary" disabled={current === 1} onClick={() => setPage(current - 1)}>Prev</button>
          <span className="btn btn-light disabled">Page {current} of {pages}</span>
          <button type="button" className="btn btn-outline-secondary" disabled={current === pages} onClick={() => setPage(current + 1)}>Next</button>
        </div>}
      </div>
    </div></section>
  );
}
