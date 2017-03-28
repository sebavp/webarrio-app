(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('alertaController', alertaController);

    function alertaController($scope, $state, $ionicHistory, $localStorage, $ionicLoading, $ionicPopup, dataAPIService) {
        
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
        };

        $scope.$on('$ionicView.beforeEnter', function () {
            var currentCondo = $localStorage.currentCondo;
            $scope.editingNumber = false;
            $scope.alertNumbers = {
                police: currentCondo.phone_police || 133, 
                fireman: currentCondo.phone_fireman || 132,
                ambulance: currentCondo.phone_ambulance || 131,
                security: currentCondo.phone_security
            };
        });

        $scope.updatePhone = function (phone) {
            $ionicLoading.show();
            var phoneToUpdate = {};
            var currentCondo = $localStorage.currentCondo;
            var realkey = "phone_" + phone;
            phoneToUpdate[realkey] = $scope.alertNumbers[phone];
            dataAPIService.updatePhone(currentCondo.id, phoneToUpdate, realkey).then(function () {
                $ionicLoading.hide();
                currentCondo[realkey] = $scope.alertNumbers[phone];
                $localStorage.currentCondo = currentCondo;
                $ionicPopup.alert({
                    title: 'Alerta Vecinal',
                    template: 'Se ha actualizado el número',
                    buttons: [{
                        text: 'OK',
                        type: 'button-orange',
                    }]
                });
            });
        };
    }




}).call(this);