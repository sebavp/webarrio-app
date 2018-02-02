(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('avisosController', avisosController);

  function avisosController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams) {

  	var currentUser = $localStorage.currentUser;
  	var currentCondo = $localStorage.currentCondo;

  	var loadAvisos = function (){
      eventsService.getAvisos(currentCondo.id).then(function (response){
        $scope.avisos = response.events;
      }, function(error){
        console.log(error);
      });
    };

    var loadAviso = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentAviso = response.event;
      }, function(error){
        console.log(error);
      });
    };

    $scope.isInvalid = function (newAviso) {
    	return !newAviso.name || !newAviso.details || !newAviso.start_time || !newAviso.event_date;
    };

    $scope.saveAviso = function (aviso){
      aviso.user_id = currentUser.user.id;
      eventsService.createEvent('notice', aviso, currentCondo.id).then(function() {
        $state.go('tabs.dashboard-avisos');
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      currentUser = $localStorage.currentUser;
      if ($state.current.name == "tabs.dashboard-avisos") {
        loadAvisos();
      } else {
        if ($state.current.name === "dashboard-avisos-new") {
          $scope.newAviso = {details: '' };
        } else{
          loadAviso();
         }
      }
    });
  }
}).call(this);