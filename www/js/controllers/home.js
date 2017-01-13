(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('homeController', homeController);

    function homeController($scope, $state, $ionicSlideBoxDelegate, $localStorage, $timeout) {
      var currentUser = $localStorage.currentUser;
      var currentCondo = $localStorage.currentCondo;

      $scope.$on('$ionicView.beforeEnter', function(){
        currentUser = $localStorage.currentUser;
        $scope.allCondos = currentUser.condos;
        $scope.currentCondo = _.first(currentUser.condos);
        $scope.allDeptos = $scope.currentCondo.departments;
        $ionicSlideBoxDelegate.$getByHandle('condoslider').update();
        $ionicSlideBoxDelegate.$getByHandle('deptoslider').update();
      })

      $scope.changeCurrentCondo = function(index){
        $scope.currentCondo = $scope.allCondos[index];
        $scope.allDeptos = $scope.currentCondo.departments;
        $localStorage.currentCondo = $scope.allCondos[index];
        var allCondos = angular.copy(currentUser.condos);
        allCondos = _.without(allCondos, _.findWhere(allCondos, {id: $scope.currentCondo.id}))
        allCondos.unshift(angular.copy($scope.currentCondo))
        $localStorage.currentUser.condos = allCondos
        $localStorage.currentDepto = _.first($scope.currentCondo.departments);
        $timeout(function() {
          $ionicSlideBoxDelegate.$getByHandle('deptoslider').update();
        }, 50);
      };

      $scope.changeCurrentDepto = function(index){
        $scope.currentDepto = $scope.currentCondo.departments[index];
        $localStorage.currentDepto = $scope.currentCondo.departments[index];
        var allDeptos = angular.copy($scope.currentCondo.departments);
        allDeptos = _.without(allDeptos, _.findWhere(allDeptos, {id: $scope.currentDepto.id}))
        allDeptos.unshift(angular.copy($scope.currentDepto))
        _.first($localStorage.currentUser.condos).departments = allDeptos
      };
    }

}).call(this);