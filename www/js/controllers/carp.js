(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('carpController', carpController)
  function carpController($scope, $state, eventsService, $localStorage, $stateParams) {
    console.info("carpController init");
    var currentCondo = $localStorage.currentCondo;
    var loadCarps = function (){
      eventsService.getCarPooling(currentCondo.id).then(function (response){
        $scope.carp = response.car_pooling;
      }, function(error){
        console.log(error)
      });
    }

    var loadCarp = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentCarPooling = response.event;
      }, function(error){
        console.log(error)
      });
    }

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "comunidad-carp") {
        loadCarps();
      } else {
        loadCarp();
      }
    })
    
    $scope.goBack = function (){
      $state.go("tabs.comunidad");
    };
    
    $scope.goToChat = function (carp){
      var currentUser = $localStorage.currentUser;
      var chatId = _.min([currentUser.user.id, carp.user_id]) + "A" + _.max([currentUser.user.id, carp.user_id])
      $state.go('chat-conversation', {chatId: chatId, personId: carp.user_id, deptoNumber: carp.user_depto_number})
    }
  }

}).call(this);