(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('feedController', feedController);

    function feedController($scope, dataAPIService, $localStorage, $ionicPopup) {
        
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

        $scope.openNotification = function (notification) {
            $ionicPopup.alert({
                cssClass: "avisoAlert",
                title: notification.title,
                template: notification.text + "\n<br> [" + notification.notification_type + "]\n ",
                okText: "X"
            });
        };

        $scope.getNotificationIcon = function (n) {
            var iconClass = "ion-ios-bell-outline";
            switch(n.notification_type){
                case "Aviso":
                    iconClass = "ion-speakerphone";
                    break;
                case "Mantenciones":
                    iconClass = "ion-wrench";
                    break;
            }
            return iconClass;
        }

        $scope.$on('$ionicView.beforeEnter', function () {
            currentCondo =  $localStorage.currentCondo;
            currentUser =  $localStorage.currentUser;
            loadNotifications();
        });
        
    }




}).call(this);