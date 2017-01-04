(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('clasificadosController', clasificadosController);

  function clasificadosController($scope, $state, $stateParams, $localStorage, announcementsService) {
    console.info("clasificadosController init");
   var currentCondo = $localStorage.currentCondo;

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

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "comunidad-clasificados") {
        loadClasificados();
      } else {
        loadClasificado();
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