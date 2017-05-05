(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('alertaController', alertaController);

    function alertaController($scope, $state, $ionicHistory, $localStorage, $ionicLoading, $ionicPopup, dataAPIService) {
        
        console.info("alertaController init");
        var currentCondo, currentUser, currentDepto;

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
            currentCondo = $localStorage.currentCondo;
            currentUser = $localStorage.currentUser;
            currentDepto = $localStorage.currentDepto;
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

        $scope.openVecinalAlert = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Alerta Vecinal',
                template: '¿Estas seguro de enviar alerta vecinal, esto notificara a todos los vecinos?',
                okText: "Sí, Enviar",
                cancelText: "Cancelar"
            });

            confirmPopup.then(function(res) {
                if(res) {
                    console.log('You are sure');
                    console.log(currentUser)
                    dataAPIService.sendSOS(currentCondo.id, currentUser.user.id, currentDepto.number).then(function () {
                        $ionicPopup.alert({
                            title: 'Alerta Vecinal Enviada',
                            template: 'Tus vecinos fueron notificados',
                            okText: "Cerrar"
                        });
                    });
                }
            });
        }
    }




}).call(this);