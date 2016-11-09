(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('chatController', chatController);

    function chatController($scope, $state, $localStorage, $ionicHistory, dataAPIService) {
        
        console.info("chatController init");

        $scope.currentCondo = $localStorage.currentCondo;
        console.log($scope.currentCondo)
        var getAllPeople = function (){
            dataAPIService.getPeopleFromCondo($scope.currentCondo.id).then(function (response){
                console.log(response)
                $scope.people = response.data.people;
            })
        }

        getAllPeople()
        $scope.activeTab = 2;

        $scope.selectTab = function(active){
            $scope.activeTab = active;            
        };

        $scope.goBack = function (){
        	if (_.isNull($ionicHistory.viewHistory().backView)) {
        		$state.go("tabs.home")
        	} else{
        		$ionicHistory.goBack();	
        	} 
        };
        
    }




}).call(this);