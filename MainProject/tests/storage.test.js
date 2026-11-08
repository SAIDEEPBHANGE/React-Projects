import { test } from "node:test";
import assert from "node:assert/strict";
import { loadMonth, saveMonth } from "../src/utils/storage.js";

function storage() {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
  };
}

test("saves independent months and recalculates legacy totals", () => {
  globalThis.localStorage = storage();
  const transactions = [
    { id: 1, title: "Pay", category: "Salary", type: "Income", amount: 100, date: "2026-04-01" },
    { id: 2, title: "Food", category: "Food", type: "Expense", amount: 25, date: "2026-04-02" },
  ];
  assert.equal(saveMonth("3 - 2026", { budget: 50, transactions }), "");
  const saved = loadMonth("3 - 2026").data;
  assert.equal(saved.totalIncome, 100);
  assert.equal(saved.totalExpense, 25);
  assert.deepEqual(saved.transactions, transactions);
  assert.deepEqual(loadMonth("4 - 2026").data, { budget: 0, transactions: [] });
});

test("reports corrupt data and storage failures instead of overwriting", () => {
  globalThis.localStorage = storage();
  localStorage.setItem("bad", "{");
  assert.equal(loadMonth("bad").data, null);
  assert.ok(loadMonth("bad").error);
  assert.equal(localStorage.getItem("bad"), "{");
  globalThis.localStorage = { getItem() { throw Error("blocked"); }, setItem() { throw Error("blocked"); } };
  assert.ok(loadMonth("bad").error);
  assert.ok(saveMonth("bad", { budget: 0, transactions: [] }));
});
