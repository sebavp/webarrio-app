(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('longtextController', longtextController);

  function longtextController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage) {
    var currentDepto =  $localStorage.currentDepto;
    console.info("longtextController init");
    $scope.longtext = {
      title: 'Título',
      html: '<p>contenido en <strong>html</strong>',
    };
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };
  }
}).call(this);