(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('eventosController', eventosController)

  function eventosController($scope, $state, $localStorage, $stateParams, eventsService) {
    console.info("eventosController init");
    var currentCondo = $localStorage.currentCondo;
    $scope.goBack = function (){
      if ($state.current.name == "comunidad-eventos") {
        $state.go("tabs.comunidad");
      } else{
        $state.go("comunidad-eventos");
      }
    };

   var loadEventos = function (){
      eventsService.getEventos(currentCondo.id).then(function (response){
        $scope.eventos = angular.copy(response.normal_events);
      }, function(error){
        console.log(error)
      });
    }

    var loadEvento = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentEvent = response.event;
      }, function(error){
        console.log(error)
      });
    }

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "comunidad-eventos") {
        loadEventos();
      } else {
        loadEvento();
      }
    })

    // $scope.eventos = [
    //   {
    //     title: 'Parrillada bienvenida!',
    //     desc: 'Están todos invitados al asado en la terraza del edificio, confirmar para calcular las compras. Traer bebida!!!!',
    //     by: 'Ana María',
    //     asist: 9,
    //     date: '14 Jun',
    //     img: '/img/blank.png'
    //   },
    // ]
  }
 

}).call(this);