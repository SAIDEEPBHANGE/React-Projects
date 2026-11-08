import { useEffect, useRef } from "react";
import { money } from "../utils/categories";

const colors = ["#dc3545", "#ffc107", "#198754", "#0dcaf0", "#0d6efd", "#6c757d"];
const badges = ["danger", "warning", "success", "info", "primary", "secondary"];

export default function ExpenseChart({ transactions }) {
  const canvas = useRef(null);
  const totals = transactions.filter((t) => t.type === "Expense").reduce((map, t) => {
    map.set(t.category, (map.get(t.category) || 0) + t.amount);
    return map;
  }, new Map());
  const entries = Array.from(totals);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  useEffect(() => {
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, 240, 240);
    let angle = -Math.PI / 2;
    entries.forEach(([, value], index) => {
      const end = angle + (value / total) * Math.PI * 2;
      context.beginPath();
      context.moveTo(120, 120);
      context.arc(120, 120, 105, angle, end);
      context.closePath();
      context.fillStyle = colors[index % colors.length];
      context.fill();
      angle = end;
    });
  });
  return (
    <section className="card border-0 shadow-sm h-100"><div className="card-body p-4">
      <h2 className="h5 mb-3"><i className="bi bi-pie-chart me-2 text-primary" aria-hidden="true" />Expense breakdown</h2>
      {entries.length ? <>
        <div className="text-center"><canvas ref={canvas} width="240" height="240" className="mw-100" aria-hidden="true" /></div>
        <ul className="list-group list-group-flush">
          {entries.map(([category, value], index) => <li className="list-group-item px-0 d-flex justify-content-between gap-2" key={category}>
            <span><span className={`badge text-bg-${badges[index % badges.length]} me-2`} aria-hidden="true">&nbsp;</span>{category}</span>
            <span>{money(value)}</span>
          </li>)}
        </ul>
      </> : <p className="text-body-secondary mb-0">Add an expense to see the breakdown.</p>}
    </div></section>
  );
}
