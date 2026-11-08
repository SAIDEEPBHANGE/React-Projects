import { test } from "node:test";
import assert from "node:assert/strict";
import { currentMonthKey, financialMonths, todayString } from "../src/utils/months.js";

test("financial year spans April through the following March", () => {
  const months = financialMonths(new Date(2026, 0, 15));
  assert.equal(months[0].value, "3 - 2025");
  assert.equal(months[8].value, "11 - 2025");
  assert.equal(months[9].value, "0 - 2026");
  assert.equal(months[11].value, "2 - 2026");
  assert.equal(financialMonths(new Date(2026, 3, 1))[0].value, "3 - 2026");
});

test("current month and date use local calendar values", () => {
  const date = new Date(2026, 0, 5, 0, 30);
  assert.equal(currentMonthKey(date), "0 - 2026");
  assert.equal(todayString(date), "2026-01-05");
});
