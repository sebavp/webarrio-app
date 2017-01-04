(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('anunciosController', anunciosController);

  function anunciosController($scope, $state, $stateParams, $localStorage, announcementsService) {
    var currentCondo = $localStorage.currentCondo;

    var loadAnuncios = function (){
      announcementsService.getAnuncios(currentCondo.id).then(function (response){
        $scope.anuncios = angular.copy(response.anuncios);
      }, function(error){
        console.log(error);
      });
    };

    var loadAnuncio = function (){
      announcementsService.getAnuncio($stateParams.announcement_id).then(function (response){
        $scope.currentAnuncio = response.announcement;
      }, function(error){
        console.log(error);
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "comunidad-anuncios") {
        loadAnuncios();
      } else {
        loadAnuncio();
      }
    });

    $scope.goToChat = function (anuncio){
      var currentUser = $localStorage.currentUser;
      var chatId = _.min([currentUser.user.id, anuncio.user_id]) + "A" + _.max([currentUser.user.id, anuncio.user_id]);
      $state.go('chat-conversation', {chatId: chatId, personId: anuncio.user_id, deptoNumber: anuncio.user_depto_number});
    };

    $scope.goBack = function (){
      if ($state.current.name == "comunidad-anuncios") {
        $state.go("tabs.comunidad");
      } else{
        $state.go("comunidad-anuncios");
      }
    };
  }

}).call(this);