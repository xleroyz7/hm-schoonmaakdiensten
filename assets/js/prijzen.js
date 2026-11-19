/* Indicatieve prijscalculator — HM Schoonmaakdiensten */
(function () {
  var form = document.getElementById('price-calculator');
  if (!form) {
    return;
  }

  var output = document.getElementById('price-output');
  var typeField = document.getElementById('calc-type');
  var areaField = document.getElementById('calc-area');
  var frequencyField = document.getElementById('calc-frequency');
  var sanitairField = document.getElementById('calc-sanitair');
  var vloerField = document.getElementById('calc-vloer');
  var glasField = document.getElementById('calc-glas');

  var types = {
    kantoor: { productivity: 200, low: 28, high: 38 },
    retail: { productivity: 160, low: 28, high: 38 },
    zorg: { productivity: 120, low: 30, high: 40 },
    onderwijs: { productivity: 140, low: 28, high: 38 },
    horeca: { productivity: 130, low: 28, high: 40 },
    industrie: { productivity: 100, low: 30, high: 45 }
  };

  var visitsPerMonth = {
    '1x': 4.33,
    '2-3x': 10.8,
    daily: 21.7
  };

  var euro = new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  function round50(value) {
    return Math.round(value / 50) * 50;
  }

  function round5(value) {
    return Math.round(value / 5) * 5;
  }

  function calculate() {
    var area = Number(areaField.value);
    if (!area || area < 25) {
      output.textContent = 'Vul een oppervlakte van minimaal 25 m² in.';
      return;
    }
    area = Math.min(area, 5000);

    var type = types[typeField.value] || types.kantoor;
    var visits = visitsPerMonth[frequencyField.value] || visitsPerMonth['2-3x'];
    var hoursPerVisit = area / type.productivity;
    var low = hoursPerVisit * type.low * visits;
    var high = hoursPerVisit * type.high * visits;

    if (sanitairField.checked) {
      low *= 1.08;
      high *= 1.15;
    }
    if (vloerField.checked) {
      low *= 1.05;
      high *= 1.10;
    }
    if (glasField.checked) {
      low *= 1.05;
      high *= 1.12;
    }

    low = Math.max(low, 300);
    high = Math.max(high, 450);
    if (high < low) {
      var swap = low;
      low = high;
      high = swap;
    }

    var perVisitLow = low / visits;
    var perVisitHigh = high / visits;

    output.innerHTML =
      '<strong>Indicatie: ' + euro.format(round50(low)) + ' – ' + euro.format(round50(high)) + ' per maand</strong>' +
      '<span>excl. btw · ongeveer ' + euro.format(round5(perVisitLow)) + ' – ' + euro.format(round5(perVisitHigh)) + ' per beurt · geen offerte</span>';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    calculate();
  });

  [typeField, areaField, frequencyField, sanitairField, vloerField, glasField].forEach(function (field) {
    field.addEventListener('change', calculate);
  });

  calculate();
})();
