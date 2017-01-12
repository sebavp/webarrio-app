(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('gastosComunesController', gastosComunesController);

  function gastosComunesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, $ionicPopup, $window, $stateParams, FileUploader, $ionicLoading, CONFIG) {
    var currentCondo = $localStorage.currentCondo;
    var currentDepto = $localStorage.currentDepto;
    var currentUser = $localStorage.currentUser;
    var uploader = $scope.uploader = new FileUploader({autoUpload: false});
    $scope.newGC = {};
    
    // CALLBACKS
    uploader.onAfterAddingAll = function(addedFileItems) {
      $scope.newGcFile = addedFileItems[0];
    };

    uploader.onSuccessItem = function(item, response) {
        console.log(response);
        $ionicLoading.hide();
        $state.go('dashboard-gastos-comunes-admin');
    };

    uploader.onErrorItem = function(item, response){
      console.log(response);
    };

    var isAdmin = function () {
      return currentUser.user.role == "admin" || currentUser.user.role == "superadmin";
    };

    $scope.showInfo = function (month) {
      $scope.showingMonth = $scope.showingMonth == month ? null : month;
    };

    $scope.isInvalid = function(gc, gcFile){
      return !gc.month || !gc.total_light || !gc.total_water || !gc.total_gas || !gc.total_personal || !gcFile;
    };

    $scope.upload = function (newGc){
      $ionicLoading.show({template: "Cargando Gastos Comunes..."});
      var uploadUrl = CONFIG.apiURL + '/condos/' + currentCondo.id + '/common_expenses';
      $scope.uploader.url = uploadUrl;
      if ($scope.uploader.queue.length > 0) {
        $scope.uploader.queue[0].url = uploadUrl;
        $scope.uploader.queue[0].formData = [
          {"month": newGc.month.name},
          {"total_light": newGc.total_light},
          {"total_gas": newGc.total_gas},
          {"total_water": newGc.total_water},
          {"total_personal": newGc.total_personal}
        ];
        $scope.uploader.uploadAll();
      }
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
      }
    });

    $scope.goToDetail = function (item) {
      var parts = item.name.split(" ");
      $state.go('dashboard-gastos-comunes-detail', {month: parts[0], year: parts[1]});
    };
    
    $scope.goBack = function (){
      switch($state.current.name){
        case "dashboard-gastos-comunes":
        case "dashboard-gastos-comunes-admin":
          $state.go("tabs.dashboard");
          break;
        case "dashboard-gastos-comunes-detail":
        case "dashboard-gastos-comunes-new":
          $state.go("dashboard-gastos-comunes-admin");
          break;
      }
    };

    $scope.download = function () {
        $window.location = CONFIG.apiURL + '/condos/' + currentCondo.id + '/common_expenses_template';
      
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