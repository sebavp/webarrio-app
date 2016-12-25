(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('asambleasController', asambleasController);

  function asambleasController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.info("asambleasController init");
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
  }
}).call(this);