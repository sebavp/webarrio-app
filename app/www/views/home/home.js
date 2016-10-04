(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('homeController', homeController);

    function homeController($scope, $state, dataAPIService) {
      $scope.home = {};
      $scope.user = {};
      dataAPIService.getUser().then( function(userData){
        $scope.user = userData.data.user;
        $scope.home.condos = userData.data.condos;
      }); 
    }

}).call(this);