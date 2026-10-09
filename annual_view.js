(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AnnualView = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function annualDetailsMarkup(names, values) {
    const rows = names.map((name, index) => `<div class="annual-row"><span>${name}</span><strong>${values[index]} 部</strong></div>`).join('');
    return `<details class="annual-details"><summary>各部經典明細</summary><div class="annual-list">${rows}</div></details>`;
  }

  return { annualDetailsMarkup };
}));
