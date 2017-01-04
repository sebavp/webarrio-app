(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('longtextController', longtextController);

  function longtextController($scope, $state) {
    $scope.longtext = {
      title: 'Reglamento',
      iframe: 'http://www.admicomu.cl/documentacion/EjemploReglamentoInterno.pdf',
    };
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
  }
}).call(this);