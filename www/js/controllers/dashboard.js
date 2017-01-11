(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('dashboardController', dashboardController);

  function dashboardController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    var currentUser =  $localStorage.currentUser;

    $scope.isAdmin = function () {
      return currentUser.user.role == 'superadmin' || currentUser.user.role == "admin";
    };

    $scope.goBack = function (){
      $state.go("tabs.home");
    };

    $scope.$on("$ionicView.beforeEnter", function () {
      $scope.currentCondo =  $localStorage.currentCondo;

      if (currentDepto) {
        dataAPIService.getCommonExpenses(currentDepto[0].id).then(function(resp){
          $scope.commonExpenses = resp.data.common_expenses;
        });
      }
      $scope.today = new Date();
      $scope.pdfUrl = "pdf/EjemploReglamentoInterno.pdf";
      $scope.page = 1;
    })
  }
}).call(this);