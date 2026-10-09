(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.ChantBackup = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const FORMAT = 'offline-chant-web-backup';
  const VERSION = 1;
  const COUNT = 5;
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  function validCounts(values, minimum) {
    return Array.isArray(values) && values.length === COUNT
      && values.every(value => Number.isInteger(value) && value >= minimum);
  }

  function validRecords(records) {
    return records && typeof records === 'object' && !Array.isArray(records)
      && Object.entries(records).every(([date, counts]) => datePattern.test(date) && validCounts(counts, 0));
  }

  function validateState(state) {
    if (!state || typeof state !== 'object' || !validCounts(state.goals, 1)) {
      throw new Error('備份檔的月目標格式不正確。');
    }
    if (!validRecords(state.records)) throw new Error('備份檔的持誦紀錄格式不正確。');
    return { goals: [...state.goals], records: Object.fromEntries(Object.entries(state.records).map(([date, counts]) => [date, [...counts]])) };
  }

  function createBackup(state, exportedAt = new Date().toISOString()) {
    return { format: FORMAT, version: VERSION, exportedAt, state: validateState(state) };
  }

  function restoreBackup(text) {
    let backup;
    try { backup = JSON.parse(text); } catch { throw new Error('無法讀取備份檔，請選擇正確的 JSON 檔案。'); }
    if (!backup || backup.format !== FORMAT || backup.version !== VERSION) {
      throw new Error('這不是離線持經紀錄的有效備份檔。');
    }
    return validateState(backup.state);
  }

  return { createBackup, restoreBackup };
}));
