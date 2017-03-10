(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('tycController', tycController);

  function tycController($rootScope, $scope, $state) {
    $scope.goBack = function (){
      $state.go("tabs.home");
    };
    $scope.$on("$ionicView.beforeEnter", function () {
      $scope.pdfUrl = "pdf/TyC_Webarrio.pdf";
      $scope.page = 1;
    });
  }
}).call(this);