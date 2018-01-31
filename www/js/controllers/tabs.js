(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('tabsController', tabsController);

  function tabsController($scope, $state, $ionicTabsDelegate) {
    $scope.tapTab = function (state, tab){
      $state.go(state);
      $ionicTabsDelegate.selectedIndex = tab;
    };
  }
}).call(this);