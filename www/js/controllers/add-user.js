(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('addUserController', addUserController);

  function addUserController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams) {
    $scope.goBack = () => $state.go('tabs.dashboard-admin-home');

    $scope.newUser = {};
    
    $scope.isValid = () => $scope.newUser.name && $scope.newUser.last_name && $scope.newUser.rut && $scope.newUser.email;

    $scope.addUserToHome = () => {
      $scope.newUser.apartment_id = $localStorage.currentApartment.id;
      dataAPIService.addUserToHome($scope.newUser)
      .then(userData => $scope.goBack());
    }

  }
}).call(this)