(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('carpController', carpController);
  function carpController($scope, $state, eventsService, $localStorage, $stateParams, announcementsService, $ionicLoading) {

    var currentCondo = $localStorage.currentCondo;
    var currentUser = $localStorage.currentUser.user;

    var loadCarps = function (){
      eventsService.getCarPooling(currentCondo.id).then(function (response){
        $scope.carp = response.car_pooling;
      }, function(error){
        console.log(error);
      });
    };

    var loadCarp = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentCarPooling = response.event;
      }, function(error){
        console.log(error);
      });
    };

    $scope.createReservation = function (evento){
      evento.user_id = currentUser.id;
      $ionicLoading.show({template: "Creando Evento..."});
      eventsService.createEvent('car_pooling', evento, currentCondo.id).then(function(){
        $state.go("tabs.comunidad-carp");
        $ionicLoading.hide();
      }, function(){
        $ionicLoading.hide();
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "tabs.comunidad-carp") {
        loadCarps();
      } else {
        if ($state.current.name == "comunidad-carp-new") {
          $scope.newEvent = {details: "", seats_available: "1"};
        } else {
          loadCarp();
        }
      }
    });
    
    $scope.goBack = function (){
      if ($state.current.name == "tabs.comunidad-carp") {
        $state.go("tabs.comunidad");
      } else {
        $state.go("tabs.comunidad-carp");
      }
    };
    
    $scope.goToChat = function (carp){
      var currentUser = $localStorage.currentUser;
      var chatId = _.min([currentUser.user.id, carp.user_id]) + "A" + _.max([currentUser.user.id, carp.user_id]);
      $state.go('chat-conversation', {chatId: chatId, personId: carp.user_id, deptoNumber: carp.user_depto_number});
    };
  }

}).call(this);