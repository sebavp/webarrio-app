(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('profileController', profileController);

    function profileController($scope, $state, $log, $localStorage, $ionicHistory) {
        
      console.info("profileController init");

 		   $scope.currentUser = $localStorage.currentUser.user;
  
       console.log($scope.currentUser)
  
        $scope.goBack = function (){
          if (_.isNull($ionicHistory.viewHistory().backView)) {
            $state.go("tabs.home")
          } else{
            $ionicHistory.goBack(); 
          } 
        };
    }




}).call(this);