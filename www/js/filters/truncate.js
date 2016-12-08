angular.module('WeBarrio.filters', [])
.filter('truncate', function () {
  return function (input, length, text) {
    var result;
    if (input && input.toString().length > length) {
      result = input.toString().substring(0, length).slice(0, (text.length) * -1) + text.toString();
    } else {
      result = input;
    }
    return result;
  };
});
