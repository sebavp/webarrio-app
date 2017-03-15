(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('alertaController', alertaController);

    function alertaController($scope, $state, $ionicHistory, $localStorage) {
        
        console.info("alertaController init");

        $scope.goBack = function (){
        	if (_.isNull($ionicHistory.viewHistory().backView)) {
        		$state.go("tabs.home");
        	} else{
        		$ionicHistory.goBack();	
        	} 
        };
        
        $scope.editNumber = function (value) {
            $scope.editingNumber = value;
        }

        $scope.$on('$ionicView.beforeEnter', function () {
            var currentCondo = $localStorage.currentCondo;
            $scope.editingNumber = false;
            console.log(currentCondo)
            $scope.alertNumbers = {
                police: currentCondo.phone_police || 133, 
                fireman: currentCondo.phone_fireman || 132,
                ambulance: currentCondo.phone_ambulance || 131,
                security: currentCondo.phone_security
            };
        })
    }




}).call(this);