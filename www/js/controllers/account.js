(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('accountController', accountController);

    function accountController($scope, $state, $ionicHistory) {
        
        console.info("accountController init");

        $scope.goBack = function (){
        	$state.go("tabs.dashboard");
        	// if (_.isNull($ionicHistory.viewHistory().backView)) {
        	// 	$state.go("tabs.dashboard")
        	// } else{
        	// 	$ionicHistory.goBack();	
        	// } 
        };
        
    }




}).call(this);