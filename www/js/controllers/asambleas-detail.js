(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('asambleasDetailController', asambleasDetailController);

  function asambleasDetailController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    console.info("asambleasDetailController init");
    $scope.goBack = function (){
      $state.go("dashboard-asambleas");
    };
  }
}).call(this);