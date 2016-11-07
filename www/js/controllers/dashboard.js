(function() {
  'use strict';

  angular
    .module('WeBarrio.controllers')
    .controller('dashboardController', dashboardController);

  function dashboardController($rootScope, $scope, $state, $ionicHistory, dataAPIService) {
    dataAPIService.getCommonExpenses($rootScope.currentDepto[0].id).then(function(resp){
      $rootScope.commonExpenses = resp.data.common_expenses;
      console.log($rootScope.commonExpenses);
    })
    $scope.goBack = function (){
      $state.go("tabs.home");
    };
  }

}).call(this);