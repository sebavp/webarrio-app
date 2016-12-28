(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('instalacionesDetailController', instalacionesDetailController);

  function instalacionesDetailController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    console.info("instalacionesDetailController init");
    $scope.goBack = function (){
      $state.go("dashboard-instalaciones");
    };
  }
}).call(this);