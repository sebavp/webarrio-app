(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('mantencionesController', mantencionesController);

  function mantencionesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.info("mantencionesController init");
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
  }
}).call(this);