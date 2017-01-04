(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('feedController', feedController);

    function feedController($scope) {
        
        console.info("feedController init");
        $scope.feed = [
        	{name: "Nueva Notificacion"}
        ];
        
    }




}).call(this);