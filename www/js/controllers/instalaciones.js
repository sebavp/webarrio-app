(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('instalacionesController', instalacionesController);

  function instalacionesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.info("instalacionesController init");
    $scope.activeTab = 2;
    $scope.selectTab = function(active){
      $scope.activeTab = active;
    };
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
    $scope.instalaciones = [
      {
        name: "Terraza",
        by: "Sergio Andueza",
        img: "/img/blank.png",
        date: "14/06",
        hourStart: "21:00",
        hourEnd: "23:00"
      },
      {
        name: "Salón de eventos",
        by: "Ana María",
        img: "/img/blank.png",
        date: "14/06",
        hourStart: "21:00",
        hourEnd: "23:00"
      },
      {
        name: "Cancha de fútbol",
        by: "Lucila",
        img: "/img/blank.png",
        date: "14/06",
        hourStart: "21:00",
        hourEnd: "23:00"
      }
    ];
  }
}).call(this);