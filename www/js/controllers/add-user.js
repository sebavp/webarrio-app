(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('addUserController', addUserController);

  function addUserController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams) {
    $scope.newUser = {};
    
    $scope.isValid = function() {$scope.newUser.name && $scope.newUser.last_name && $scope.newUser.rut && $scope.newUser.email;};

    $scope.addUserToHome = function() {
      $scope.newUser.apartment_id = $localStorage.currentApartment.id;
      dataAPIService.addUserToHome($scope.newUser)
      .then(function(userData) {$scope.goBack();});
    }

  }
}).call(this)