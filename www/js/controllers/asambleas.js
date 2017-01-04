(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('asambleasController', asambleasController);

  function asambleasController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams) {

    var currentCondo = $localStorage.currentCondo;

    $scope.goBack = function (){
      if ($state.current.name == "dashboard-asambleas") {
        $state.go("tabs.dashboard");
      } else{
        $state.go("dashboard-asambleas");
      }
    };

    $scope.goToCurrentAsamblea = function (){
      $state.go('dashboard-asambleas-detail', {event_id: $scope.currentAsamblea.id});
    };

    var loadAsambleas = function (){
      eventsService.getAsambleas(currentCondo.id).then(function (response){
        $scope.currentAsamblea = _.first(response.asambleas);
        response.asambleas.shift();
        $scope.asambleas = angular.copy(response.asambleas);
      }, function(error){
        console.log(error);
      });
    };

    var loadAsamblea = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentAsamblea = response.event;
      }, function(error){
        console.log(error);
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "dashboard-asambleas") {
        loadAsambleas();
      } else {
        loadAsamblea();
      }
    });
  }
}).call(this);