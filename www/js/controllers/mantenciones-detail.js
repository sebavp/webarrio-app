(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('mantencionesDetailController', mantencionesDetailController);

  function mantencionesDetailController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    console.info("mantencionesDetailController init");
    $scope.goBack = function (){
      $state.go("dashboard-mantenciones");
    };
  }
}).call(this);