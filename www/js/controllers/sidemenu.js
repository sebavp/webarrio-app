(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('sideMenuController', sideMenuController);
  function sideMenuController($scope, $state, $log, $localStorage, $ionicHistory, dataAPIService) {
	  $scope.currentUser = $localStorage.currentUser.user;
    $scope.goBack = function (){
      if (_.isNull($ionicHistory.viewHistory().backView)) {
        $state.go("tabs.home");
      } else {
        $ionicHistory.goBack();
      }
    };

    var loadCurrentUser = function (){
      dataAPIService.getUser($scope.currentUser.id).then(function(response){
        $localStorage.currentUser.user = response.data.user;
      });
    };

    $scope.$on('$ionicView.beforeEnter', function(){
      loadCurrentUser();
    });
  }
}).call(this);