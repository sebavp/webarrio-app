(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('dashboardController', dashboardController);

    function dashboardController($scope, $state, $ionicHistory) {
        
        console.info("dashboardController init");

        $scope.goBack = function (){
            $state.go("tabs.home");
        };
        
    }




}).call(this);