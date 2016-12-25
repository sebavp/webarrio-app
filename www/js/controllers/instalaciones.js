(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('instalacionesController', instalacionesController);

  function instalacionesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.info("instalacionesController init");
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
  }
}).call(this);