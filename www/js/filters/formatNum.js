angular.module('WeBarrio.filters', [])
.filter('CLP', function () {
  return function (input, param_decimals, param_prefix) {
    var decimals = param_decimals || 0;

    var formatMoney = function (n, c, d, t) {
        c = isNaN(c = Math.abs(c)) ? 2 : c;
        d = d == undefined ? "." : d;
        t = t == undefined ? "," : t;
        var s = n < 0 ? "-" : "";
        var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
        var j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    var value = 0;

    if (typeof(input) == "undefined") {
        return null;
    }

    try {
        value = parseFloat(input);
    } catch (e) {
        return null;
    }

    var num = formatMoney(value, decimals, ",", ".");

    return num;
  };
});