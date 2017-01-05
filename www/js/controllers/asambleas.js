(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('asambleasController', asambleasController);

  function asambleasController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams, $filter) {

    var currentCondo = $localStorage.currentCondo;
    var currentUser = $localStorage.currentUser;

    $scope.goBack = function (){
      if ($state.current.name == "dashboard-asambleas") {
        $state.go("tabs.dashboard");
      } else{
        $state.go("dashboard-asambleas");
      }
    };

    $scope.goToCurrentAsamblea = function (){
      $state.go('dashboard-asambleas-detail', {event_id: $scope.currentAsamblea.id});
    };

    var loadAsambleas = function (){
      eventsService.getAsambleas(currentCondo.id).then(function (response){
        $scope.currentAsamblea = _.first(response.asambleas);
        response.asambleas.shift();
        $scope.asambleas = angular.copy(response.asambleas);
      }, function(error){
        console.log(error);
      });
    };

    var loadAsamblea = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentAsamblea = response.event;
      }, function(error){
        console.log(error);
      });
    };

    $scope.saveAsamblea = function(asamblea){
      asamblea.event_date = new Date();
      asamblea.user_id = currentUser.user.id;
      eventsService.createEvent('asambleas', asamblea, currentCondo.id).then(function(){
        $state.go('dashboard-asambleas');
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      currentUser = $localStorage.currentUser;
      if ($state.current.name == "dashboard-asambleas") {
        loadAsambleas();
      } else {
        if ($state.current.name === "dashboard-asambleas-new") {
          $scope.newAsamblea = {name: "Asamblea del " + $filter('date')(new Date, "dd/MM 'del' yyyy"), details: '' };
        } else{
          loadAsamblea();
         }
      }
    });
  }
}).call(this);