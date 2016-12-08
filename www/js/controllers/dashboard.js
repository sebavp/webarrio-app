(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('dashboardController', dashboardController);

  function dashboardController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.log(currentDepto);
    if (currentDepto) {
      dataAPIService.getCommonExpenses(currentDepto[0].id).then(function(resp){
        $scope.commonExpenses = resp.data.common_expenses;
      });
    }

    $scope.pdfUrl = "https://firebasestorage.googleapis.com/v0/b/webarrio-6ffa7.appspot.com/o/EjemploReglamentoInterno.pdf?alt=media&token=0045d607-b127-4c99-a974-37d8ac449e0f"//'http://www.admicomu.cl/documentacion/EjemploReglamentoInterno.pdf';
    $scope.page = 1;

    $scope.goBack = function (){
      $state.go("tabs.home");
    };
  }
}).call(this);