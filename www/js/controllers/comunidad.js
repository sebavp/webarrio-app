(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('comunidadController', comunidadController);

  function comunidadController($scope, $state) {
    $scope.goBack = function (){
      $state.go("tabs.home");
    };
  }

}).call(this);