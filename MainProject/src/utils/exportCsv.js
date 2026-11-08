function csvCell(value) {
  let text = String(value);
  if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export function exportCsv(transactions, month) {
  const rows = [["Title", "Category", "Type", "Amount (INR)", "Date"],
    ...transactions.map((t) => [t.title, t.category, t.type, t.amount.toFixed(2), t.date])];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `ExpenseReport_${month.replace(/ /g, "")}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
