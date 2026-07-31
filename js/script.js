(function () {
  var TIERS = [
    { start: '2026-08-01', end: '2026-08-11', label: 'Early Bird', general: 15, generalMXN: 319, pro: 19, proMXN: 389 },
    { start: '2026-08-11', end: '2026-08-21', label: 'Ventana 2', general: 19, generalMXN: 399, pro: 25, proMXN: 499 },
    { start: '2026-08-21', end: '2026-08-28', label: 'Ventana 3', general: 25, generalMXN: 499, pro: 29, proMXN: 599 },
    { start: '2026-08-28', end: '2026-08-31', label: 'Última oportunidad', general: 29, generalMXN: 599, pro: 35, proMXN: 699 }
  ];

  function getActiveTierIndex(now) {
    for (var i = 0; i < TIERS.length; i++) {
      var start = new Date(TIERS[i].start + 'T00:00:00');
      var end = new Date(TIERS[i].end + 'T00:00:00');
      if (now < start) return i === 0 ? 0 : i;
      if (now >= start && now < end) return i;
    }
    return TIERS.length - 1;
  }

  function daysUntil(dateStr, now) {
    var target = new Date(dateStr + 'T00:00:00');
    var diff = target.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  function render() {
    var now = new Date();
    var idx = getActiveTierIndex(now);
    var tier = TIERS[idx];
    var nextTier = TIERS[idx + 1];

    var setText = function (id, val) {
      var el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setText('price-general', tier.general);
    setText('price-general-mxn', tier.generalMXN);
    setText('price-pro', tier.pro);
    setText('price-pro-mxn', tier.proMXN);

    setText('urgency-label', tier.label + ' activo');
    setText('urgency-price', 'desde $' + tier.general + ' USD');

    var rows = document.querySelectorAll('.ladder__row[data-tier]');
    rows.forEach(function (row) {
      row.classList.toggle('is-active', Number(row.getAttribute('data-tier')) === idx);
    });

    var countdownEl = document.getElementById('urgency-countdown');
    var ladderUrgencyEl = document.getElementById('ladder-urgency');

    if (nextTier) {
      var days = daysUntil(tier.end, now);
      var dayLabel = days === 1 ? 'día' : 'días';
      var msg = 'sube a $' + nextTier.general + ' USD en ' + days + ' ' + dayLabel;
      if (countdownEl) countdownEl.textContent = '· ' + msg;
      if (ladderUrgencyEl) ladderUrgencyEl.textContent = 'El precio ' + msg + '.';
    } else {
      if (countdownEl) countdownEl.textContent = '· última ventana antes del evento';
      if (ladderUrgencyEl) ladderUrgencyEl.textContent = 'Esta es la última ventana de precio antes del evento.';
    }
  }

  document.addEventListener('DOMContentLoaded', render);
})();
