const assert = require('node:assert/strict');
const { annualTotals, monthlyTotals } = require('./stats');

const result = annualTotals(115, [
  { date: '2026-02-17', counts: [1, 2, 3, 4, 5] },
  { date: '2026-03-01', counts: [2, 0, 1, 0, 2] },
  { date: '2027-02-07', counts: [9, 9, 9, 9, 9] },
]);

assert.deepEqual(result.counts, [3, 2, 4, 4, 7]);
assert.equal(result.total, 20);

const month = monthlyTotals('2026-02-17', [
  { date: '2026-02-16', counts: [9, 9, 9, 9, 9] },
  { date: '2026-02-17', counts: [1, 2, 3, 4, 5] },
  { date: '2026-03-18', counts: [2, 0, 1, 0, 2] },
  { date: '2026-03-19', counts: [8, 8, 8, 8, 8] },
]);
assert.deepEqual(month, [3, 2, 4, 4, 7]);
console.log('年度與農曆月統計測試通過');
