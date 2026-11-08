export default function Header({ month, months, onChange }) {
  return (
    <header className="bg-dark text-white py-3 shadow-sm">
      <div className="container d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
        <div>
          <h1 className="h4 mb-1"><i className="bi bi-wallet2 me-2" aria-hidden="true" />Expense Tracker</h1>
          <p className="text-white-50 small mb-0">Your money, one month at a time</p>
        </div>
        <div>
          <label htmlFor="month" className="form-label small mb-1">Financial year month</label>
          <select id="month" className="form-select" value={month} onChange={(e) => onChange(e.target.value)}>
            {months.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
      </div>
    </header>
  );
}
