(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('comunidadController', comunidadController)
  .controller('anunciosController', anunciosController)
  .controller('anunciosDetailController', anunciosController)
  .controller('eventosController', eventosController)
  .controller('eventosDetailController', eventosDetailController)
  .controller('clasificadosController', clasificadosController)
  .controller('clasificadosDetailController', clasificadosDetailController);

  function comunidadController($scope, $state) {
    console.info("comunidadController init");
    $scope.goBack = function (){
      $state.go("tabs.home");
    };
  }
  function anunciosDetailController($scope, $state) {
    console.info("anunciosDetailController init");
  }
  function clasificadosDetailController($scope, $state) {
    console.info("clasificadosDetailController init");
    $scope.goBack = function (){
      $state.go("comunidad-clasificados");
    };
  }
  function eventosDetailController($scope, $state) {
    console.info("eventosDetailController init");
    $scope.goBack = function (){
      $state.go("comunidad-eventos");
    };
  }
  function clasificadosController($scope, $state) {
    console.info("clasificadosController init");
    $scope.clasificados = [
      {
        title: 'Vendo sillón y escritorio',
        desc: 'Sillón 2 plazas gris, 1,50 x 70 mts y escritorio escandinavo, 2 cajones. Estado impecable!! $50000 el escritorio y $70000 el sillón',
        by: 'Ana María',
        date: '14 Jun',
        img: '/img/blank.png'
      },
      {
        title: 'Regalo platos',
        desc: 'Sillón 2 plazas gris, 1,50 x 70 mts y escritorio escandinavo, 2 cajones. Estado impecable!!',
        by: 'Ana María',
        date: '14 Jun',
        img: '/img/blank.png'
      },
      {
        title: 'Se alquila dpto 4B',
        desc: 'Sillón 2 plazas gris, 1,50 x 70 mts y escritorio escandinavo, 2 cajones. Estado impecable!!',
        by: 'Ana María',
        date: '14 Jun',
        img: '/img/blank.png'
      },
      {
        title: 'Miel artesanal',
        desc: 'Sillón 2 plazas gris, 1,50 x 70 mts y escritorio escandinavo, 2 cajones. Estado impecable!!',
        by: 'Ana María',
        date: '14 Jun',
        img: '/img/blank.png'
      }
    ]
    $scope.goBack = function (){
      $state.go("tabs.comunidad");
    };
  }
  function eventosController($scope, $state) {
    console.info("eventosController init");
    $scope.eventos = [
      {
        title: 'Parrillada bienvenida!',
        desc: 'Están todos invitados al asado en la terraza del edificio, confirmar para calcular las compras. Traer bebida!!!!',
        by: 'Ana María',
        asist: 9,
        date: '14 Jun',
        img: '/img/blank.png'
      },
      {
        title: 'Showroom zapatos',
        desc: 'Se cambió el horario de retiro de basura de 21 a 20 hs.',
        by: 'Ana María',
        asist: 19,
        date: '14 Jun',
        img: '/img/blank.png'
      },
      {
        title: 'Cumpleaños Sergio',
        desc: 'Pueden participar en el nuevo huerto que creamos en el jardín contrafrente.',
        by: 'Ana María',
        asist: 4,
        date: '14 Jun',
        img: '/img/blank.png'
      }
    ]
    $scope.goBack = function (){
      $state.go("tabs.comunidad");
    };
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