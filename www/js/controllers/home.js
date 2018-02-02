(function() {
    'use strict';

    angular
    .module('WeBarrio.controllers')
    .controller('homeController', homeController);

    function homeController($scope, $state, $ionicSlideBoxDelegate, $localStorage, $timeout, Auth) {
      var currentUser = $localStorage.currentUser;

      $scope.$on('$ionicView.beforeEnter', function(){
        currentUser = $localStorage.currentUser;
        $scope.allCondos = currentUser.condos;
        $scope.currentCondo = _.first(currentUser.condos);
        $scope.allApartments = $scope.currentCondo.apartments;
        $ionicSlideBoxDelegate.$getByHandle('condoslider').update();
        $ionicSlideBoxDelegate.$getByHandle('deptoslider').update();
        if (ionic.Platform.isWebView() && $localStorage.dvNotifications !== true) { 
          
          window.plugins.OneSignal.getIds(function(ids) {
            console.log('getIds: ' + JSON.stringify(ids));
            Auth.setDevice(currentUser.user.id, {token: ids.userId}).then(function(){
              $localStorage.dvNotifications = true;
            });
          });
        }

      });

      $scope.changeCurrentCondo = function(index){
        $scope.currentCondo = $scope.allCondos[index];
        $scope.allApartments = $scope.currentCondo.apartments;
        $localStorage.currentCondo = $scope.allCondos[index];
        var allCondos = angular.copy(currentUser.condos);
        allCondos = _.without(allCondos, _.findWhere(allCondos, {id: $scope.currentCondo.id}));
        allCondos.unshift(angular.copy($scope.currentCondo));
        $localStorage.currentUser.condos = allCondos;
        $localStorage.currentApartment = _.first($scope.currentCondo.apartments);
        $timeout(function() {
          $ionicSlideBoxDelegate.$getByHandle('deptoslider').update();
        }, 50);
      };

      $scope.changeCurrentApartment = function(index){
        $scope.currentApartment = $scope.currentCondo.apartments[index];
        $localStorage.currentApartment = $scope.currentCondo.apartments[index];
        var allApartments = angular.copy($scope.currentCondo.apartments);
        allApartments = _.without(allApartments, _.findWhere(allApartments, {id: $scope.currentApartment.id}));
        allApartments.unshift(angular.copy($scope.currentApartment));
        _.first($localStorage.currentUser.condos).apartments = allApartments;
      };
    }

}).call(this);