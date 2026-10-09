const assert = require('node:assert/strict');
const { monthlyCardsMarkup, monthlyDetailsMarkup } = require('./monthly_view');

const markup = monthlyCardsMarkup(['甲經', '乙經'], [2, 3], [9, 8]);
assert.match(markup, /甲經/);
assert.match(markup, /乙經/);
assert.match(markup, /<div class="item total-item">合計<b>5 \/ 17<\/b>/);
assert.match(markup, /<progress max="17" value="5"><\/progress>/);
const details = monthlyDetailsMarkup(['甲經', '乙經'], [2, 3], [9, 8]);
assert.match(details, /^<details class="monthly-details">/);
assert.match(details, /<summary>各部經典明細<\/summary>/);
console.log('本月合計卡片測試通過');
