(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('longtextController', longtextController);

  function longtextController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.info("longtextController init");
    $scope.longtext = {
      title: 'Reglamento',
      iframe: 'http://www.admicomu.cl/documentacion/EjemploReglamentoInterno.pdf',
    };
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
  }
}).call(this);