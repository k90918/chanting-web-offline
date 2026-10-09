const { Solar } = require('lunar-javascript');

function lunarYear(date) {
  const [year, month, day] = date.split('-').map(Number);
  return Solar.fromYmd(year, month, day).getLunar().getYear() - 1911;
}

function annualTotals(targetLunarYear, records) {
  const counts = [0, 0, 0, 0, 0];
  for (const record of records) {
    if (lunarYear(record.date) !== targetLunarYear) continue;
    record.counts.forEach((count, index) => { counts[index] += count; });
  }
  return { counts, total: counts.reduce((sum, value) => sum + value, 0) };
}

function lunarMonthKey(date) {
  const [year, month, day] = date.split('-').map(Number);
  const lunar = Solar.fromYmd(year, month, day).getLunar();
  return `${lunar.getYear()}-${lunar.getMonth()}`;
}

function monthlyTotals(selectedDate, records) {
  const target = lunarMonthKey(selectedDate);
  const counts = [0, 0, 0, 0, 0];
  for (const record of records) {
    if (lunarMonthKey(record.date) !== target) continue;
    record.counts.forEach((count, index) => { counts[index] += count; });
  }
  return counts;
}

function daysUntilNextLunarFirst(date) {
  const start = new Date(`${date}T00:00:00`);
  for (let days = 1; days <= 31; days += 1) {
    const candidate = new Date(start);
    candidate.setDate(candidate.getDate() + days);
    const solar = Solar.fromYmd(candidate.getFullYear(), candidate.getMonth() + 1, candidate.getDate());
    if (solar.getLunar().getDay() === 1) return days;
  }
  throw new Error('找不到下個農曆初一');
}

module.exports = { annualTotals, lunarYear, lunarMonthKey, monthlyTotals, daysUntilNextLunarFirst };
