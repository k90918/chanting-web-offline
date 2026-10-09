const assert = require('node:assert/strict');
const { localDateString } = require('./date_utils');

assert.equal(localDateString(new Date(2026, 9, 9, 0, 5)), '2026-10-09');
assert.equal(localDateString(new Date(2026, 0, 3, 23, 59)), '2026-01-03');
console.log('本機當日日期測試通過');
