(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('pagosController', pagosController);

    function pagosController($scope, $localStorage, dataAPIService, $state, $stateParams) {
        
        console.info("pagosController init");
        $scope.newPay = {};
        var currentCondo, currentDepto, currentUser;

        $scope.isAdmin = function () {
            return currentUser.user.role == "superadmin" || currentUser.user.role == "admin";
        };

        $scope.goBack = function (){
            if ($state.current.name == "tabs.dashboard-pagos") {
                $state.go("tabs.dashboard");
            } else {
                $state.go("tabs.dashboard-pagos");
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

        var loadDepartamentos = function () {
            dataAPIService.getDepartments(currentCondo.id).then(function (response) {
                $scope.departments = response.data.departments;
            });
        };

        $scope.createPayment = function (payment) {
            payment.admin_id = currentUser.user.id;
            payment.department = payment.department.id;
            dataAPIService.createPayment(currentDepto.id, payment).then(function () {
                $state.go("tabs.dashboard-pagos");
            });
        };

        $scope.isInvalid = function (newPay) {
            return !newPay.department || !newPay.total_amount || !newPay.payment_method || !newPay.payer_name;
        };

        $scope.goToPayment = function (payment) {
            $state.go('dashboard-pagos-detail', {deptoId: payment.department_id});
        };

        $scope.$on("$ionicView.beforeEnter", function(){
            currentCondo =  $localStorage.currentCondo;
            currentDepto = $localStorage.currentDepto;
            currentUser =  $localStorage.currentUser;
            switch($state.current.name){
                case "tabs.dashboard-pagos":
                    loadPagos();
                    break;
                case "dashboard-pagos-detail":
                    loadPagosDepartment($stateParams.deptoId);
                    break;
                case "dashboard-pagos-new":
                    loadDepartamentos();
                    break;
            }
        });
        
    }




}).call(this);