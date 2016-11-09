(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('alertaController', alertaController);

    function alertaController($scope, $state, $ionicHistory) {
        
        console.info("alertaController init");

        $scope.goBack = function (){
        	if (_.isNull($ionicHistory.viewHistory().backView)) {
        		$state.go("tabs.home")
        	} else{
        		$ionicHistory.goBack();	
        	} 
        };
        
    }




}).call(this);