(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('comunidadController', comunidadController)
  .controller('anunciosController', anunciosController)
  .controller('anunciosDetailController', anunciosController)
  .controller('clasificadosController', clasificadosController)
  .controller('clasificadosDetailController', clasificadosDetailController)
  .controller('recomendacionesController', recomendacionesController)
  .controller('recomendacionesDetailController', recomendacionesDetailController)
  .controller('mascotasController', mascotasController)
  .controller('mascotasDetailController', mascotasDetailController)

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
  function mascotasDetailController($scope, $state) {
    console.info("mascotasDetailController init");
    $scope.goBack = function (){
      $state.go("comunidad-mascotas");
    };
  }
  function mascotasController($scope, $state) {
    console.info("mascotasController init");
    $scope.mascotas = [
      {
        title: 'Se perdió Flaco!!!!!!!',
        desc: 'Gato negro, macho. Lleva collar rojo. Por favor si lo encuentran contáctenme por acá o al 599991003. Visto por última vez el viernes a la tarde.',
        by: 'Ana María',
        img: '/img/blank.png',
        date: '14 JUN'
      },
      {
        title: 'Regalo perritos',
        desc: 'Abrió hace poco y tiene buenos precios para socios.',
        by: 'Ana María',
        img: '/img/blank.png',
        date: '14 JUN'
      },
      {
        title: 'BLAS PERDIDO',
        desc: 'Sillón 2 plazas gris, 1,50 x 70 mts y escritorio escandinavo, 3 cajones',
        by: 'Ana María',
        img: '/img/blank.png',
        date: '14 JUN'
      }
    ]
    $scope.goBack = function (){
      $state.go("tabs.comunidad");
    };
  }
  function recomendacionesDetailController($scope, $state) {
    console.info("recomendacionesDetailController init");
    $scope.goBack = function (){
      $state.go("comunidad-recomendaciones");
    };
  }
  function recomendacionesController($scope, $state) {
    console.info("recomendacionesController init");
    $scope.recomendaciones = [
      {
        title: 'Nuevo Café en la esquina',
        desc: 'Super rico y buenos precios!!!!',
        by: 'Ana María',
        name: 'BRACIA',
        address: 'SUECIA 205',
        img: '/img/blank.png'
      },
      {
        title: 'Club sport fit',
        desc: 'Abrió hace poco y tiene buenos precios para socios.',
        by: 'Ana María',
        name: 'BRACIA',
        address: 'SUECIA 205',
        img: '/img/blank.png'
      },
      {
        title: 'Sushi Sushi',
        desc: 'Para comer en el lugar o pedidos, es muy bueno y precio acorde a calidad.',
        by: 'Ana María',
        name: 'BRACIA',
        address: 'SUECIA 205',
        img: '/img/blank.png'
      },
      {
        title: 'Miel artesanal',
        desc: 'Sillón 2 plazas gris, 1,50 x 70 mts y escritorio escandinavo, 3 cajones',
        by: 'Ana María',
        name: 'BRACIA',
        address: 'SUECIA 205',
        img: '/img/blank.png'
      }
    ]
    $scope.goBack = function (){
      $state.go("tabs.comunidad");
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