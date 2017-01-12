(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('avisosController', avisosController);

  function avisosController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams, FileUploader, CONFIG, $ionicLoading) {

    $scope.goBack = function (){
       $state.go("tabs.dashboard");
    };
  }
}).call(this);