
(function findDescription () {
  const metas = [
    'meta[name="twitter:description"]',
    'meta[property="og:description"]',
    'meta[name="description"]',
  ];

  for (let idx = 0; idx < metas.length; idx++) {
    const m = document.querySelector(metas[idx]);
    if (m) return norm(m.getAttribute('content'));
  }

  const p = document.querySelector('p');
  if (p) return norm(p.textContent);

  function norm (str = '') {
    return str.replace(/\s+/g, ' ').replace(/^\s+|\s$/g, '');
  }

  return '';
})();
