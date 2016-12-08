(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('detailController', detailController);

  function detailController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.info("detailController init");
    $scope.accountDetails = {};
    $scope.accountDetails.total_luz = {title:'Luz', total:'5000'};
    $scope.accountDetails.total_gas = {title:'Gas', total:'8000'};
    $scope.accountDetails.total_agua = {title:'Agua', total:'2000'};
    $scope.accountDetails.total_calefaccion = {title:'Calefacción', total:'28000'};

    var currentDepto =  $localStorage.currentDepto;
    if (currentDepto) {
      dataAPIService.getCommonExpenses(currentDepto[0].id).then(function(resp){
        $scope.commonExpenses = resp.data.common_expenses;
        console.log($scope.commonExpenses)
      });
    };
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
  }
}).call(this);