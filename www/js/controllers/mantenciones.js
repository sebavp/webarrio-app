(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('mantencionesController', mantencionesController);

  function mantencionesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams) {
    var currentDepto =  $localStorage.currentDepto;
    var currentCondo = $localStorage.currentCondo;
    console.info("mantencionesController init");
    $scope.activeTab = 3;
    $scope.selectTab = function(active){
      $scope.activeTab = active;
    };
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
    
    var loadMantenciones = function (){
      eventsService.getMantenciones(currentCondo.id).then(function (response){
        $scope.mantenciones = angular.copy(response.mantenciones);
      }, function(error){
        console.log(error)
      });
    }

    var loadMantencion = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentMantencion = response.event;
      }, function(error){
        console.log(error)
      });
    }

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "dashboard-mantenciones") {
        loadMantenciones();
      } else {
        loadMantencion();
      }
    })

  }
}).call(this);