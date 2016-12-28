(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('comunidadController', comunidadController)
  .controller('anunciosController', anunciosController);

  function comunidadController($scope, $state) {
    console.info("comunidadController init");
    $scope.goBack = function (){
      $state.go("tabs.comunidad");
    };
  }
  function anunciosController($scope, $state) {
    console.info("anunciosController init");
    $scope.goBack = function (){
      $state.go("tabs.comunidad");
    };
  }

}).call(this);