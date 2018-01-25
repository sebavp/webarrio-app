(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('dashboardController', dashboardController);

  function dashboardController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, $sce, $window) {
    var currentApartment =  $localStorage.currentApartment;
    var currentUser =  $localStorage.currentUser;

    $scope.isAdmin = () => currentUser.user.roles.filter(role => ['admin', 'superadmin'].includes(role)).length > 0;

    $scope.isOwner = () => currentUser.user.roles.includes('owner');

    $scope.goBack = function (){
      $state.go("tabs.home");
    };

    $scope.$on("$ionicView.beforeEnter", function () {
      var supportsPdfMimeType = typeof navigator.mimeTypes["application/pdf"] !== "undefined";

      var createAXO = function(type) {
        var ax;
        try {
          ax = new ActiveXObject(type);
        } catch (e) {
          ax = null;
        }
        return ax;
      };
      var isIE = function() {
        return !!(window.ActiveXObject || "ActiveXObject"in window);
      };

      var supportsPdfActiveX = function() {
        return !!(createAXO("AcroPDF.PDF") || createAXO("PDF.PdfCtrl"));
      };

      $scope.supportsPDFs = supportsPdfMimeType || isIE() && supportsPdfActiveX();

      $scope.currentCondo =  $localStorage.currentCondo;

      if (currentApartment) {
        dataAPIService.getCommonExpenses(currentApartment.id).then(function(resp){
          $scope.commonExpenses = resp.data.common_expenses;
        });
      }
      $scope.today = new Date();
      $scope.pdfUrl = $sce.trustAsResourceUrl($scope.currentCondo.reglamento_url);
      
      $scope.goToPdf = function () {
        $window.open($sce.trustAsResourceUrl($scope.currentCondo.reglamento_url), '_system');
      };

    });
  }
}).call(this);