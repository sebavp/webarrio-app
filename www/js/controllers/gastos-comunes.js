(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('gastosComunesController', gastosComunesController);

  function gastosComunesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, $ionicPopup, $window, $stateParams) {
    var currentCondo = $localStorage.currentCondo;
    var currentDepto = $localStorage.currentDepto;
    var currentUser = $localStorage.currentUser;

    var isAdmin = function () {
      return currentUser.user.role == "admin" || currentUser.user.role == "superadmin";
    };

    $scope.showInfo = function (month) {
      $scope.showingMonth = $scope.showingMonth == month ? null : month;
    };

    $scope.$on('$ionicView.beforeEnter', function () {
      currentCondo = $localStorage.currentCondo;
      currentDepto = $localStorage.currentDepto;

      if ($state.current.name == "dashboard-gastos-comunes-admin" && isAdmin()) {
        dataAPIService.getAllCommonExpenses(currentCondo.id).then(function (resp) {
          $scope.commonExpenses = resp.data.common_expenses;
        });
      } 
      if ($state.current.name == "dashboard-gastos-comunes"){
        dataAPIService.getCommonExpenses(currentDepto[0].id).then(function(resp){
          $scope.commonExpenses = resp.data.common_expenses;
        });
      }

      if ($state.current.name == "dashboard-gastos-comunes-detail") {
        $scope.currentMonth = $stateParams.month;
        $scope.currentYear = $stateParams.year;
        dataAPIService.getCommonExpensesInMonth(currentCondo.id, $stateParams.month, $stateParams.year).then(function(resp){
          $scope.commonExpenses = resp.data.common_expenses;
          $scope.currentGC = _.first($scope.commonExpenses);
        });
      };
    });

    $scope.goToDetail = function (item) {
      var parts = item.name.split(" ");
      $state.go('dashboard-gastos-comunes-detail', {month: parts[0], year: parts[1]})
    };
    
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };

    $scope.download = function () {
      $window.location = 'https://s3-sa-east-1.amazonaws.com/webarrio.cl/Template+Gastos+Comunes.xlsx';
    };

    $scope.meses = [
      {name: "Enero"},
      {name: "Febrero"},
      {name: "Marzo"},
      {name: "Abril"},
      {name: "Mayo"},
      {name: "Junio"},
      {name: "Julio"},
      {name: "Agosto"},
      {name: "Septiembre"},
      {name: "Octubre"},
      {name: "Noviembre"},
      {name: "Diciembre"},
    ];

    // An alert dialog
    $scope.showPaymentMethod = function() {
      $ionicPopup.alert({
        title: 'Metodos de pago',
        template: currentCondo.account || 'Contáctese al Administrador para ver formas de pago.',
        buttons: [{
          text: 'OK',
          type: 'button-orange',
        }]
      });
    };
  }
}).call(this);