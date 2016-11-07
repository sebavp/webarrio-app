(function() {
  'use strict';

  angular
    .module('WeBarrio.controllers')
    .controller('dashboardController', dashboardController);

  function dashboardController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.log(currentDepto)
    if (currentDepto) {
      dataAPIService.getCommonExpenses(currentDepto[0].id).then(function(resp){
        $scope.commonExpenses = resp.data.common_expenses;
      })
    };
    $scope.goBack = function (){
      $state.go("tabs.home");
    };
  }

}).call(this);