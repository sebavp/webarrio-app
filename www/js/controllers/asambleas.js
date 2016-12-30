(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('asambleasController', asambleasController)
    .controller('asambleasDetailController', asambleasDetailController);

  function asambleasController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.info("asambleasController init");
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
  }
  function asambleasDetailController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    console.info("asambleasDetailController init");
    $scope.goBack = function (){
      $state.go("dashboard-asambleas");
    };
  }
  
}).call(this);