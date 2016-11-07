(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('homeController', homeController);

    function homeController($scope, $rootScope, $state, $ionicSlideBoxDelegate, $localStorage) {
      $rootScope.home = {};
      $rootScope.user = {};
      var currentUser = $localStorage.currentUser;

      // console.log(currentUser);
      $rootScope.user = currentUser.user;
      $rootScope.home.condos = currentUser.condos;
      if ($rootScope.home.condos && $rootScope.home.condos.length > 0) {
        $rootScope.currentDepto = $rootScope.home.condos[0].departments;
        // console.log($rootScope.currentDepto);
      } else {
        $rootScope.home.condos = [];
      }
      // dataAPIService.getUser().then( function(userData){
      //   $ionicSlideBoxDelegate.update();
      // }); 
      $rootScope.slideHasChanged = function($index){
        $rootScope.currentDepto = $rootScope.home.condos[$index].departments;
      };
    }

}).call(this);