(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.MonthlyView = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function cardMarkup(name, value, goal, extraClass = '') {
    return `<div class="item ${extraClass}">${name}<b>${value} / ${goal}</b><progress max="${goal}" value="${Math.min(value, goal)}"></progress></div>`;
  }

  function monthlyCardsMarkup(names, values, goals) {
    const details = names.map((name, index) => cardMarkup(name, values[index], goals[index])).join('');
    const totalValue = values.reduce((sum, value) => sum + value, 0);
    const totalGoal = goals.reduce((sum, value) => sum + value, 0);
    return `${details}${cardMarkup('合計', totalValue, totalGoal, 'total-item')}`;
  }

  function monthlyDetailsMarkup(names, values, goals) {
    return `<details class="monthly-details"><summary>各部經典明細</summary><div class="grid">${monthlyCardsMarkup(names, values, goals)}</div></details>`;
  }

  return { monthlyCardsMarkup, monthlyDetailsMarkup };
}));
