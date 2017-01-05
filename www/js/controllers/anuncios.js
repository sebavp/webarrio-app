(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('anunciosController', anunciosController);

  function anunciosController($scope, $state, $stateParams, $localStorage, announcementsService, FileUploader, $ionicLoading, CONFIG) {
    var currentCondo = $localStorage.currentCondo;
    var currentUser = $localStorage.currentUser.user;
    var uploader = $scope.uploader = new FileUploader({autoUpload: false});
    
    // CALLBACKS
    uploader.onAfterAddingAll = function(addedFileItems) {
      $scope.newEventImage = addedFileItems[0];
    };

    uploader.onCompleteAll = function() {
        $ionicLoading.hide();
        $state.go('comunidad-anuncios');
    };

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

  $scope.createAnnouncement = function (anuncio){
      anuncio.user_id = currentUser.id;
      $ionicLoading.show({template: "Creando anuncio..."});
      announcementsService.createAnnouncement('anuncios', anuncio, currentCondo.id).then(function(response){
        var imageUrl =  CONFIG.apiURL + '/announcements/image/' + response.anuncio.id;
        $scope.uploader.url = imageUrl;
        if ($scope.uploader.queue.length > 0) {
          _.last($scope.uploader.queue).url = imageUrl;
          _.last($scope.uploader.queue).removeAfterUpload = true;
          $scope.uploader.uploadAll();
        }
      }, function(){
        $ionicLoading.hide();
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "comunidad-anuncios") {
        loadAnuncios();
      } else {
        if ($state.current.name == "comunidad-anuncios-new") {
          $scope.newPublication = {description: '', title: ''};
        } else {
          loadAnuncio();
        }
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