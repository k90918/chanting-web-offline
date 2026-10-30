(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.DailyRecordsView = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function dailyRecordsMarkup(records, names) {
    if (!records.length) {
      return '<details class="daily-details"><summary>每日紀錄</summary><p class="sub empty">本農曆月尚無持誦紀錄。</p></details>';
    }
    const rows = records.map((record) => {
      const counts = names
        .map((name, index) => record.counts[index] > 0 ? `<div>${name} <b>${record.counts[index]}</b></div>` : '')
        .join('') || '<span class="sub">尚未持誦</span>';
      return `<div class="daily-row"><div class="daily-date"><b>農曆 ${record.lunarDay}</b><span>${record.solarDate} ${record.weekday}</span></div><div class="daily-counts">${counts}</div></div>`;
    }).join('');
    return `<details class="daily-details"><summary>每日紀錄</summary><div class="daily-head"><span>農曆／國曆</span><span>已持誦</span></div><div class="daily-list">${rows}</div></details>`;
  }

  return { dailyRecordsMarkup };
}));
