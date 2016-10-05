(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('homeController', homeController);

    function homeController($scope, $state, dataAPIService, $ionicSlideBoxDelegate) {
      $scope.home = {};
      $scope.user = {};
      dataAPIService.getUser().then( function(userData){
        $scope.user = userData.data.user;
        $scope.home.condos = userData.data.condos;
        $scope.currentDepto = $scope.home.condos[0].departments;
        $ionicSlideBoxDelegate.update();
      }); 
      $scope.slideHasChanged = function($index){
        $scope.currentDepto = $scope.home.condos[$index].departments;
      };
    }

}).call(this);