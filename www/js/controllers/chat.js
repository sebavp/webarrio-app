(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('chatController', chatController);

    function chatController($scope, $state, $localStorage, $ionicHistory) {
        
        console.info("chatController init");

        $scope.currentCondo = $localStorage.currentCondo

        $scope.goBack = function (){
        	if (_.isNull($ionicHistory.viewHistory().backView)) {
        		$state.go("tabs.chat")
        	} else{
        		$ionicHistory.goBack();	
        	} 
        };
        
    }




}).call(this);