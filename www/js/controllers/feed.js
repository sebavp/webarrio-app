(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('feedController', feedController);

    function feedController($scope, dataAPIService, $localStorage) {
        
        $scope.notifications = [];

        var currentCondo, currentUser;

        var loadNotifications = function(){
            dataAPIService.getUserNotifications(currentUser.user.id, currentCondo.id)
            .then(function (response) {
                console.log(response)
                $scope.notifications = response.data.feed;
            }, function  (error) {
                console.log(error);
            });
        };

        $scope.$on('$ionicView.beforeEnter', function () {
            currentCondo =  $localStorage.currentCondo;
            currentUser =  $localStorage.currentUser;
            loadNotifications();
        });
        
    }




}).call(this);