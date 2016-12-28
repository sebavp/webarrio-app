(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('mantencionesController', mantencionesController);

  function mantencionesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.info("mantencionesController init");
    $scope.activeTab = 3;
    $scope.selectTab = function(active){
      $scope.activeTab = active;
    };
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
    $scope.mantenciones = [
      {
        name: "Corte de Agua",
        by: "mantención de tanque",
        date: "14/06",
        hourStart: "21:00",
        hourEnd: "23:00"
      },
      {
        name: "Piscina Cerrada",
        by: "limpieza",
        date: "14/06",
        hourStart: "21:00",
        hourEnd: "23:00"
      },
      {
        name: "Obras en el piso 5",
        by: "filtraciones",
        date: "14/06",
        hourStart: "21:00",
        hourEnd: "23:00"
      }
    ];
  }
}).call(this);