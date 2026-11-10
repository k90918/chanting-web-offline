const assert = require('assert');
const { dailyRecordsMarkup } = require('./daily_records_view');

const html = dailyRecordsMarkup([
  {
    lunarDay: 1,
    solarDate: '2026-10-10',
    weekday: '星期六',
    counts: [1, 1, 1, 0, 1],
  },
  {
    lunarDay: 2,
    solarDate: '2026-10-11',
    weekday: '星期日',
    counts: [0, 0, 0, 0, 0],
  },
], ['武德真經', '金剛般若波羅蜜經', '藥師琉璃光如來本願功德經', '地藏菩薩本願經', '般若波羅蜜多心經'], true);

assert.ok(html.includes('<details class="daily-details" open>'));
assert.ok(html.includes('<summary>每日紀錄</summary>'));
assert.ok(html.includes('農曆／國曆'));
assert.ok(html.includes('已持誦'));
assert.ok(html.includes('農曆 1'));
assert.ok(html.includes('2026-10-10 星期六'));
assert.ok(html.includes('武德真經 <b>1</b>'));
assert.ok(html.includes('般若波羅蜜多心經 <b>1</b>'));
assert.ok(!html.includes('地藏菩薩本願經 <b>0</b>'));
assert.ok(html.includes('農曆 2'));
assert.ok(html.includes('2026-10-11 星期日'));
assert.ok(html.includes('尚未紀錄'));

console.log('每日紀錄明細測試通過');
