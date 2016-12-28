(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('comunidadController', comunidadController)
  .controller('anunciosController', anunciosController)
  .controller('anunciosDetailController', anunciosController);

  function comunidadController($scope, $state) {
    console.info("comunidadController init");
    $scope.goBack = function (){
      $state.go("tabs.home");
    };
  }
  function anunciosDetailController($scope, $state) {
    console.info("anunciosDetailController init");
  }
  function anunciosController($scope, $state) {
    console.info("anunciosController init");
    $scope.anuncios = [
      {
        title: 'Pelota perdida',
        desc: 'Se encontró una pelota en la cancha de fútbol el jueves a la tarde, contactarse conmigo.',
        by: 'Ana María',
        date: '14 Jun',
        img: '/img/blank.png'
      },
      {
        title: 'Cambio recolección basura',
        desc: 'Se cambió el horario de retiro de basura de 21 a 20 hs.',
        by: 'Ana María',
        date: '14 Jun',
        img: '/img/blank.png'
      },
      {
        title: 'Nuevo huerto',
        desc: 'Pueden participar en el nuevo huerto que creamos en el jardín contrafrente.',
        by: 'Ana María',
        date: '14 Jun',
        img: '/img/blank.png'
      }
    ]
    $scope.goBack = function (){
      $state.go("tabs.comunidad");
    };
  }

}).call(this);