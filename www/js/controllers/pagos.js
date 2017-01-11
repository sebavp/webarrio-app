(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('pagosController', pagosController);

    function pagosController($scope, $localStorage, dataAPIService, $state) {
        
        console.info("pagosController init");
        var currentDepto =  $localStorage.currentDepto;
        var currentCondo =  $localStorage.currentCondo;
        var currentUser =  $localStorage.currentUser;

        $scope.goBack = function (){
          $state.go("tabs.dashboard");
        };

        var loadPagos = function () {
            dataAPIService.getAllPayments(currentCondo.id).then(function (response) {
                $scope.payments = response.data.payments;
            });
        };

        var loadPagosDepartment = function (deptoId) {
            dataAPIService.getPayments(deptoId).then(function (response) {
                $scope.payments = response.data.payments;
            });
        };

        $scope.goToPayment = function (payment) {
            $state.go('dashboard-pagos-detail', {deptoId: payment.department_id});
        };

        $scope.$on("$ionicView.beforeEnter", function(){
            if ($state.current.state == "dashboard-pagos") {
                loadPagos();
            }
            if ($state.current.state == "dashboard-pagos-detail") {
                loadPagosDepartment($stateParams.deptoId)
            };
        });
        
    }




}).call(this);