import { test } from "node:test";
import assert from "node:assert/strict";
import { exportCsv } from "../src/utils/exportCsv.js";

test("exports escaped rows for the selected month and protects spreadsheet formulas", async () => {
  let blob;
  let clicked = false;
  let revoked = "";
  const link = { click() { clicked = true; }, remove() {} };
  const originalDocument = globalThis.document;
  const originalCreate = URL.createObjectURL;
  const originalRevoke = URL.revokeObjectURL;
  const originalTimeout = globalThis.setTimeout;
  try {
    globalThis.document = { createElement: () => link, body: { appendChild() {} } };
    URL.createObjectURL = (value) => { blob = value; return "blob:test"; };
    URL.revokeObjectURL = (value) => { revoked = value; };
    globalThis.setTimeout = (callback) => callback();
    exportCsv([{ title: '=SUM("A1")', category: "Other", type: "Expense", amount: 12.5, date: "2026-04-01" }], "3 - 2026");
    const csv = await blob.text();
    assert.match(csv, /"'=SUM\(""A1""\)"/);
    assert.match(csv, /"12\.50"/);
    assert.equal(link.download, "ExpenseReport_3-2026.csv");
    assert.ok(clicked);
    assert.equal(revoked, "blob:test");
  } finally {
    globalThis.document = originalDocument;
    URL.createObjectURL = originalCreate;
    URL.revokeObjectURL = originalRevoke;
    globalThis.setTimeout = originalTimeout;
  }
});
