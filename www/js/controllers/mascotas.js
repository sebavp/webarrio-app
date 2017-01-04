(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('mascotasController', mascotasController);

  function mascotasController($scope, $state, $stateParams, $localStorage, announcementsService) {
    var currentCondo = $localStorage.currentCondo;

    var loadMascotas = function (){
      announcementsService.getMascotas(currentCondo.id).then(function (response){
        $scope.mascotas = angular.copy(response.mascotas);
      }, function(error){
        console.log(error);
      });
    };

    var loadMascota = function (){
      announcementsService.getAnuncio($stateParams.announcement_id).then(function (response){
        $scope.currentMascota = response.announcement;
      }, function(error){
        console.log(error);
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "comunidad-mascotas") {
        loadMascotas();
      } else {
        loadMascota();
      }
    });

    $scope.goToChat = function (mascota){
      var currentUser = $localStorage.currentUser;
      var chatId = _.min([currentUser.user.id, mascota.user_id]) + "A" + _.max([currentUser.user.id, mascota.user_id]);
      $state.go('chat-conversation', {chatId: chatId, personId: mascota.user_id, deptoNumber: mascota.user_depto_number});
    };

    $scope.goBack = function (){
      if ($state.current.name == "comunidad-mascotas") {
        $state.go("tabs.comunidad");
      } else{
        $state.go("comunidad-mascotas");
      }
    };
  }
  

}).call(this);