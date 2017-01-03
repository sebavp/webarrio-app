(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('asambleasController', asambleasController)

  function asambleasController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams) {
    var currentDepto =  $localStorage.currentDepto;
    var currentCondo = $localStorage.currentCondo;
    console.info("asambleasController init");
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };

    $scope.goToCurrentAsamblea = function (){
      $state.go('dashboard-asambleas-detail', {event_id: $scope.currentAsamblea.id})
    }

    var loadAsambleas = function (){
      eventsService.getAsambleas(currentCondo.id).then(function (response){
        $scope.currentAsamblea = _.first(response.asambleas);
        response.asambleas.shift()
        $scope.asambleas = angular.copy(response.asambleas);
      }, function(error){
        console.log(error)
      });
    }

    var loadAsamblea = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentAsamblea = response.event;
      }, function(error){
        console.log(error)
      });
    }

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "dashboard-asambleas") {
        loadAsambleas();
      } else {
        loadAsamblea();
      }
    })
  }
}).call(this);