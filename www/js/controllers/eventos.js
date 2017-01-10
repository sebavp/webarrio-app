(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('eventosController', eventosController);

  function eventosController($scope, $state, $localStorage, $stateParams, eventsService, $timeout, FileUploader, CONFIG, $ionicLoading) {
    
    var currentCondo = $localStorage.currentCondo;
    var currentUser = $localStorage.currentUser.user;
    $scope.currentUserAssistent = false;
    var uploader = $scope.uploader = new FileUploader({autoUpload: false});
    
    // CALLBACKS
    uploader.onAfterAddingAll = function(addedFileItems) {
      $scope.newEventImage = addedFileItems[0];
    };

    uploader.onCompleteAll = function() {
        $ionicLoading.hide();
        $state.go('comunidad-eventos');
    };
    
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
        console.log(error);
      });
    };

    var loadEvento = function (){
      currentUser = $localStorage.currentUser.user;
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentEvent = response.event;
        if (_.contains(_.map(response.event.assistants_id, function(v){return parseInt(_.keys(v)[0]); }), currentUser.id) ) {
          $scope.currentUserAssistent = true;
        }
      }, function(error){
        console.log(error);
      });
    };

    $scope.createReservation = function (evento){
      evento.user_id = currentUser.id;
      $ionicLoading.show({template: "Creando Evento..."});
      eventsService.createEvent('normal_events', evento, currentCondo.id).then(function(response){
        $scope.uploader.url = CONFIG.apiURL + '/events/image/' + response.normal_event.id;
        if ($scope.uploader.queue.length > 0) {
          $scope.uploader.queue[0].url = CONFIG.apiURL + '/events/image/' + response.normal_event.id;
          $scope.uploader.uploadAll();
        }
      }, function(){
        $ionicLoading.hide();
      });
    };

    $scope.newAssistent = function(confirmed){
      eventsService.newAssistent({user_id: currentUser.id, event_id: parseInt($stateParams.event_id), confirmed: confirmed}).then(function(){
        $scope.currentUserAssistent = true;
      });
    };

    $scope.cancelAssistent = function(){
      eventsService.cancelAssistent({user_id: currentUser.id, event_id: parseInt($stateParams.event_id)}).then(function(){
        $scope.currentUserAssistent = false;
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "comunidad-eventos") {
        loadEventos();
      } else {
        if ($state.current.name == "comunidad-eventos-new") {
          $scope.newEvent = {details: ""};
        } else {
          loadEvento();
        }
      }
    });
  }
 

}).call(this);