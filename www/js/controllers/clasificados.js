(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('clasificadosController', clasificadosController);

  function clasificadosController($scope, $state, $stateParams, $localStorage, announcementsService, FileUploader, $ionicLoading, CONFIG) {

    var currentCondo = $localStorage.currentCondo;
    var currentUser = $localStorage.currentUser.user;
    var uploader = $scope.uploader = new FileUploader({autoUpload: false});
    
    // CALLBACKS
    uploader.onAfterAddingAll = function(addedFileItems) {
      $scope.newEventImage = addedFileItems[0];
    };

    uploader.onCompleteAll = function() {
        $ionicLoading.hide();
        $state.go('comunidad-clasificados');
    };
    var loadClasificados = function (){
      announcementsService.getClasificados(currentCondo.id).then(function (response){
        $scope.clasificados = angular.copy(response.clasificados);
      }, function(error){
        console.log(error);
      });
    };

    var loadClasificado = function (){
      announcementsService.getAnuncio($stateParams.announcement_id).then(function (response){
        $scope.currentClasificado = response.announcement;
      }, function(error){
        console.log(error);
      });
    };

  $scope.createAnnouncement = function (anuncio){
      anuncio.user_id = currentUser.id;
      $ionicLoading.show({template: "Creando anuncio..."});
      announcementsService.createAnnouncement('clasificados', anuncio, currentCondo.id).then(function(response){
        var imageUrl =  CONFIG.apiURL + '/announcements/image/' + response.clasificado.id;
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
      if ($state.current.name == "comunidad-clasificados") {
        loadClasificados();
      } else {
        if ($state.current.name == "comunidad-clasificados-new") {
          $scope.newPublication = {description: '', title: ''};
        } else {
          loadClasificado();
        }
      }
    });

    $scope.goToChat = function (clasificado){
      var currentUser = $localStorage.currentUser;
      var chatId = _.min([currentUser.user.id, clasificado.user_id]) + "A" + _.max([currentUser.user.id, clasificado.user_id]);
      $state.go('chat-conversation', {chatId: chatId, personId: clasificado.user_id, deptoNumber: clasificado.user_depto_number});
    };

    $scope.goBack = function (){
      if ($state.current.name == "comunidad-clasificados") {
        $state.go("tabs.comunidad");
      } else{
        $state.go("comunidad-clasificados");
      }
    };
  }
 

}).call(this);