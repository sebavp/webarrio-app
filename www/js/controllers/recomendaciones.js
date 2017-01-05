(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('recomendacionesController', recomendacionesController);

  function recomendacionesController($scope, $state, $stateParams, announcementsService, $localStorage, FileUploader, $ionicLoading, CONFIG) {
    console.info("recomendacionesController init");
    var currentCondo = $localStorage.currentCondo;
    var currentUser = $localStorage.currentUser.user;
    var uploader = $scope.uploader = new FileUploader({autoUpload: false});
    
    // CALLBACKS
    uploader.onAfterAddingAll = function(addedFileItems) {
      $scope.newEventImage = addedFileItems[0];
    };

    uploader.onCompleteAll = function() {
        $ionicLoading.hide();
        $state.go('comunidad-recomendaciones');
    };

    var loadRecomendaciones = function (){
      announcementsService.getRecomendaciones(currentCondo.id).then(function (response){
        $scope.recomendaciones = angular.copy(response.recomendaciones);
      }, function(error){
        console.log(error);
      });
    };

    var loadRecomendacion = function (){
      announcementsService.getAnuncio($stateParams.announcement_id).then(function (response){
        $scope.currentRecomendacion = response.announcement;
      }, function(error){
        console.log(error);
      });
    };

    $scope.createAnnouncement = function (anuncio){
      anuncio.user_id = currentUser.id;
      $ionicLoading.show({template: "Creando publicación..."});
      announcementsService.createAnnouncement('recomendaciones', anuncio, currentCondo.id).then(function(response){
        var imageUrl =  CONFIG.apiURL + '/announcements/image/' + response.recomendacion.id;
        $scope.uploader.url = imageUrl;
        if ($scope.uploader.queue.length > 0) {
          $scope.uploader.queue[0].url = imageUrl;
          $scope.uploader.uploadAll();
        }
      }, function(){
        $ionicLoading.hide();
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "comunidad-recomendaciones") {
        loadRecomendaciones();
      } else {
        if ($state.current.name == "comunidad-recomendaciones-new") {
          $scope.newPublication = {description: '', title: ''};
        } else {
          loadRecomendacion();
        }
      }
    });

    $scope.goBack = function (){
      if ($state.current.name == "comunidad-recomendaciones") {
        $state.go("tabs.comunidad");
      } else{
        $state.go("comunidad-recomendaciones");
      }
    };
  }
  

}).call(this);