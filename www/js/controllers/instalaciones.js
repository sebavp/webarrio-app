(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('instalacionesController', instalacionesController);

  function instalacionesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams) {
    var currentDepto =  $localStorage.currentDepto;
    var currentCondo =  $localStorage.currentCondo;
    var currentUser =  $localStorage.currentUser;
    console.log(currentCondo)
    console.info("instalacionesController init");
    $scope.activeTab = 2;
    $scope.selectTab = function(active){
      $scope.activeTab = active;
    };
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };

    var loadInstalaciones = function (){
      eventsService.getInstalaciones(currentCondo.id).then(function (response){
        $scope.instalaciones = response.instalaciones;
      }, function(error){
        console.log(error)
      });
    }

    var loadInstalacion = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentEvent = response.event;
      }, function(error){
        console.log(error)
      });
    }

    $scope.createReservation = function (reservation){
      reservation.user_id = currentUser.user.id;
      eventsService.createEvent('instalaciones', reservation, currentCondo.id).then(function(response){
        $state.go('dashboard-instalaciones')
      })
    }

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "dashboard-instalaciones") {
        loadInstalaciones();
      }
      if ($state.current.name == "dashboard-instalaciones-detail") {
        loadInstalacion();
      }
      $scope.newEvent = {}
    })

  }
}).call(this);