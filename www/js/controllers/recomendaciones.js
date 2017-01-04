(function() {
'use strict';

angular
  .module('WeBarrio.controllers')
  .controller('recomendacionesController', recomendacionesController);

  function recomendacionesController($scope, $state, $stateParams, announcementsService, $localStorage) {
    console.info("recomendacionesController init");
   var currentCondo = $localStorage.currentCondo;

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

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "comunidad-recomendaciones") {
        loadRecomendaciones();
      } else {
        loadRecomendacion();
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