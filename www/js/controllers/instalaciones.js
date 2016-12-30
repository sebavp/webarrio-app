(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('instalacionesController', instalacionesController);

  function instalacionesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams) {
    var currentDepto =  $localStorage.currentDepto;
    var currentCondo =  $localStorage.currentCondo;
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

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "dashboard-instalaciones") {
        loadInstalaciones();
      } else {
        loadInstalacion();
      }
    })
    // $scope.instalaciones = [
    //   {
    //     name: "Terraza",
    //     by: "Sergio Andueza",
    //     img: "/img/blank.png",
    //     date: "14/06",
    //     hourStart: "21:00",
    //     hourEnd: "23:00"
    //   }
    // ];
  }
}).call(this);