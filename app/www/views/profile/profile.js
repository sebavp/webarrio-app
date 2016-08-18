(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('profileController', profileController);

    function profileController($scope, $state, $log, $localStorage, Auth) {
        
        console.info("profileController init");

 		$scope.user = angular.fromJson($localStorage.profile);
 		$log.log("User:", $localStorage.email);

		$scope.logOut = function () {
      		Auth.logout();
      		$state.go('login');
  		};

        
    }




}).call(this);