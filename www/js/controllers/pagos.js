(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('pagosController', pagosController);

    function pagosController($scope, $localStorage, dataAPIService, $state, $stateParams) {
        
        console.info("pagosController init");
        var currentCondo =  $localStorage.currentCondo;
        var currentUser =  $localStorage.currentUser;

        $scope.goBack = function (){
            if ($state.current.name == "dashboard-pagos") {
                $state.go("tabs.dashboard");
            } else {
                $state.go("dashboard-pagos");
            }
        };

        var loadPagos = function () {
            dataAPIService.getAllPayments(currentCondo.id).then(function (response) {
                $scope.payments = response.data.payments;
            });
        };

        var loadPagosDepartment = function (deptoId) {
            dataAPIService.getPayments(deptoId).then(function (response) {
                $scope.payments = response.data.payments;
                $scope.currentDepartment = {name: _.first($scope.payments).depto_number};
            });
        };

        $scope.goToPayment = function (payment) {
            $state.go('dashboard-pagos-detail', {deptoId: payment.department_id});
        };

        $scope.$on("$ionicView.beforeEnter", function(){
            if ($state.current.name == "dashboard-pagos") {
                loadPagos();
            }
            if ($state.current.name == "dashboard-pagos-detail") {
                loadPagosDepartment($stateParams.deptoId);
            }
        });
        
    }




}).call(this);