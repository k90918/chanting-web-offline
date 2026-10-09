const assert = require('node:assert/strict');
const { annualDetailsMarkup } = require('./annual_view');

const markup = annualDetailsMarkup(['甲經', '乙經'], [3, 8]);
assert.match(markup, /^<details class="annual-details">/);
assert.match(markup, /<summary>各部經典明細<\/summary>/);
assert.match(markup, /甲經/);
assert.match(markup, /3 部/);
assert.match(markup, /乙經/);
assert.match(markup, /8 部/);
console.log('年度明細收合顯示測試通過');
