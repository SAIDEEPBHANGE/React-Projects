import { useState } from "react";
import Header from "./components/Header";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import ExpenseChart from "./components/ExpenseChart";
import { currentMonthKey, financialMonths } from "./utils/months";
import { loadMonth, saveMonth } from "./utils/storage";
import { exportCsv } from "./utils/exportCsv";

function App() {
  const [month, setMonth] = useState(currentMonthKey);
  const [result, setResult] = useState(() => loadMonth(currentMonthKey()));
  const [notice, setNotice] = useState("");
  const data = result.data;
  const changeMonth = (key) => {
    setMonth(key);
    setResult(loadMonth(key));
    setNotice("");
  };
  const update = (next) => {
    const error = saveMonth(month, next);
    if (error) { setNotice(error); return false; }
    setResult({ data: next, error: "" });
    setNotice("");
    return true;
  };
  const add = (transaction) => update({
    ...data, transactions: [{ ...transaction, id: data.transactions.reduce(
      (max, item) => typeof item.id === "number" ? Math.max(max, item.id) : max, Date.now()) + 1 }, ...data.transactions],
  });
  const remove = (id) => update({
    ...data, transactions: data.transactions.filter((item) => item.id !== id),
  });
  const exportData = () => {
    if (!data.transactions.length) { setNotice("No transactions to export for this month."); return; }
    try { exportCsv(data.transactions, month); setNotice(""); }
    catch { setNotice("Could not export the CSV. Please try again."); }
  };
  return (
    <div className="bg-body-tertiary min-vh-100">
      <Header month={month} months={financialMonths()} onChange={changeMonth} />
      <main className="container py-4">
        {(result.error || notice) && <div role="alert" className="alert alert-warning">{result.error || notice}</div>}
        {data && <>
          <Summary key={month} data={data} onBudget={(budget) => update({ ...data, budget })} />
          <div className="row g-4 mb-4">
            <div className="col-lg-7"><TransactionForm onAdd={add} /></div>
            <div className="col-lg-5"><ExpenseChart transactions={data.transactions} /></div>
          </div>
          <TransactionTable key={month} transactions={data.transactions} onDelete={remove} onExport={exportData} />
        </>}
      </main>
    </div>
  );
}

export default App;
