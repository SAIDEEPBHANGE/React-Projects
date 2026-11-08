const emptyMonth = () => ({ budget: 0, transactions: [] });

export function loadMonth(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { data: emptyMonth(), error: "" };
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.transactions) ||
      !Number.isFinite(data.budget) || data.budget < 0 ||
      !data.transactions.every((t) => t && (typeof t.id === "number" || typeof t.id === "string") &&
        typeof t.title === "string" && typeof t.category === "string" &&
        ["Income", "Expense"].includes(t.type) && Number.isFinite(t.amount) &&
        t.amount > 0 && typeof t.date === "string")) {
      throw new Error("Invalid month data");
    }
    return { data, error: "" };
  } catch {
    return { data: null, error: "Could not read this month's data. Check your browser storage and try again." };
  }
}

export function saveMonth(key, data) {
  try {
    const totalIncome = data.transactions.reduce((sum, t) => sum + (t.type === "Income" ? t.amount : 0), 0);
    const totalExpense = data.transactions.reduce((sum, t) => sum + (t.type === "Expense" ? t.amount : 0), 0);
    localStorage.setItem(key, JSON.stringify({ ...data, totalIncome, totalExpense }));
    return "";
  } catch {
    return "Could not save your changes. Check your browser storage and try again.";
  }
}
