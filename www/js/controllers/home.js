(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('homeController', homeController);

    function homeController($scope, $state, $ionicSlideBoxDelegate, $localStorage) {
      $scope.home = {};
      $scope.user = {};
      var currentUser = $localStorage.currentUser
      console.log(currentUser);
      $scope.user = currentUser.user;
      $scope.home.condos = currentUser.condos;
      if ($scope.home.condos && $scope.home.condos.length > 0) {
        $scope.currentDepto = $scope.home.condos[0].departments;
        console.log($scope.currentDepto);
      } else {
        $scope.home.condos = [];
      }
      // dataAPIService.getUser().then( function(userData){
      //   $ionicSlideBoxDelegate.update();
      // }); 
      $scope.slideHasChanged = function($index){
        $scope.currentDepto = $scope.home.condos[$index].departments;
      };
    }

}).call(this);