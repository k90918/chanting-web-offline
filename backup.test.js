const assert = require('node:assert/strict');
const { createBackup, restoreBackup, backupFilename } = require('./backup');

const state = {
  goals: [9, 8, 7, 6, 5],
  records: {
    '2026-10-09': [1, 2, 3, 4, 5],
  },
};

const backup = createBackup(state, '2026-10-09T12:00:00.000Z');
assert.equal(backup.format, 'offline-chant-web-backup');
assert.equal(backup.version, 1);
assert.equal(backup.exportedAt, '2026-10-09T12:00:00.000Z');
assert.deepEqual(restoreBackup(JSON.stringify(backup)), state);
assert.throws(() => restoreBackup(JSON.stringify({ format: 'other', version: 1, state })), /備份檔/);
assert.throws(() => restoreBackup(JSON.stringify({ ...backup, state: { ...state, goals: [9] } })), /月目標/);
assert.throws(() => restoreBackup(JSON.stringify({ ...backup, state: { ...state, records: { '2026-10-09': [1, 2, 3] } } })), /持誦紀錄/);
assert.equal(backupFilename(new Date(2026, 9, 9)), '持經紀錄_2026-10-09.json');
console.log('備份匯出與匯入驗證測試通過');
