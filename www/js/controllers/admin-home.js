(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('adminHomeController', adminHomeController);

  function adminHomeController($rootScope, $scope, $state, $ionicPopup, dataAPIService, $localStorage, eventsService, $stateParams) {
    dataAPIService.getHomeUsers($localStorage.currentApartment.id).then(function(usersData) {$scope.users = usersData.data.users;});
    
    $scope.goBack = function() {$state.go('tabs.dashboard');}

    $scope.removeUser = function(user) {
      $ionicPopup.show({
        scope: $scope,
        title: '¿Está seguro?',
        buttons: [
          {text: 'No'},
          {
            text: 'Sí',
            type: 'button-positive',
            onTap: function() {
              dataAPIService.removeHomeUser({user: user.id, apartment: $localStorage.currentApartment.id});
              $scope.users = $scope.users.filter(function(u) {u.id != user.id});
            }
          }
        ]
      });
    };
  }
}).call(this)