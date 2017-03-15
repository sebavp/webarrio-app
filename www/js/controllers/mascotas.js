(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('mascotasController', mascotasController);

  function mascotasController($scope, $state, $stateParams, $localStorage, announcementsService, FileUploader, $ionicLoading, CONFIG) {
    var currentCondo = $localStorage.currentCondo;
    var currentUser = $localStorage.currentUser.user;
    var uploader = $scope.uploader = new FileUploader({autoUpload: false});
    
    // CALLBACKS
    uploader.onAfterAddingAll = function(addedFileItems) {
      $scope.newEventImage = addedFileItems[0];
    };

    uploader.onCompleteAll = function() {
        $ionicLoading.hide();
        $state.go('tabs.comunidad-mascotas');
    };

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

    $scope.createAnnouncement = function (anuncio){
      anuncio.user_id = currentUser.id;
      $ionicLoading.show({template: "Creando publicación..."});
      announcementsService.createAnnouncement('mascotas', anuncio, currentCondo.id).then(function(response){
        var imageUrl =  CONFIG.apiURL + '/announcements/image/' + response.mascota.id;
        $scope.uploader.url = imageUrl;
        if ($scope.uploader.queue.length > 0) {
          $scope.uploader.queue[0].url = imageUrl;
          $scope.uploader.uploadAll();
        } else {
          $ionicLoading.hide();
          $state.go("tabs.comunidad-mascotas");
        }
      }, function(){
        $ionicLoading.hide();
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "tabs.comunidad-mascotas") {
        loadMascotas();
      } else {
        if ($state.current.name == "comunidad-mascotas-new") {
          $scope.newPublication = {description: '', title: ''};
        } else {
          loadMascota();
        }
      }
    });

    $scope.goToChat = function (mascota){
      var currentUser = $localStorage.currentUser;
      var chatId = _.min([currentUser.user.id, mascota.user_id]) + "A" + _.max([currentUser.user.id, mascota.user_id]);
      $state.go('chat-conversation', {chatId: chatId, personId: mascota.user_id, deptoNumber: mascota.user_depto_number});
    };

    $scope.goBack = function (){
      if ($state.current.name == "tabs.comunidad-mascotas") {
        $state.go("tabs.comunidad");
      } else{
        $state.go("tabs.comunidad-mascotas");
      }
    };
  }
  

}).call(this);