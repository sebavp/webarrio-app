(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('mantencionesController', mantencionesController);

  function mantencionesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams) {

    var currentCondo = $localStorage.currentCondo;
    var currentUser = $localStorage.currentUser;
    var allMantenciones = [];

    $scope.isAdmin = function () {
      return currentUser.user.role == 'superadmin' || currentUser.user.role == "admin";
    };

    $scope.goBack = function (){
      if ($state.current.name == "tabs.dashboard-mantenciones") {
        $state.go("tabs.dashboard");
      } else {
        $state.go("tabs.dashboard-mantenciones");
      }
    };

    var getMonday = function (d) {
      d = new Date(d);
      var day = d.getDay();
      var diff = d.getDate() - day + (day === 0 ? -6 : 1); 
      return new Date(d.setDate(diff));
    };

    var getNextDayOfWeek = function(date, dayOfWeek) {
      var resultDate = new Date(date.getTime());
      resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
      return resultDate;
    };

    $scope.filterBy = function(option){
      $scope.activeTab = option;
      switch(option){
        case 1:
          $scope.mantenciones = _.filter(allMantenciones, function(mantencion) {
            var currentDate = (new Date(mantencion.event_date)).getTime();
            var start = (new Date()).setHours(0,0,0,0);
            var end = (new Date()).setHours(23,59,59,999);
            return currentDate >= start && currentDate < end;
          });
          break;
        case 2:
          $scope.mantenciones = _.filter(allMantenciones, function(mantencion) {
            var currentDate = new Date(mantencion.event_date);
            var start = getMonday(new Date);
            var end = getNextDayOfWeek(new Date, 0);
            return currentDate >= start && currentDate < end;
          });
          break;
        case 3:
          $scope.mantenciones = _.filter(allMantenciones, function(mantencion) {
            var currentDate = new Date(mantencion.event_date);
            var today = new Date(), y = today.getFullYear(), m = today.getMonth();
            var start = new Date(y, m, 1);
            var end = new Date(y, m + 1, 0);
            return currentDate >= start && currentDate < end;
          });
          break;
      }
    };
    
    var loadMantenciones = function (){
      eventsService.getMantenciones(currentCondo.id).then(function (response){
        allMantenciones = angular.copy(response.mantenciones);
        $scope.filterBy(2);
      }, function(error){
        console.log(error);
      });
    };

    var loadMantencion = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentMantencion = response.event;
      }, function(error){
        console.log(error);
      });
    };

    $scope.createReservation = function (mantencion){
      mantencion.user_id = currentUser.user.id;
      eventsService.createEvent('mantenciones', mantencion, currentCondo.id).then(function(){
        $state.go('tabs.dashboard-mantenciones');
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      currentUser = $localStorage.currentUser;
      if ($state.current.name == "tabs.dashboard-mantenciones") {
        loadMantenciones();
      } else {
        if ($state.current.name === "dashboard-mantenciones-new") {
          $scope.newMantencion = {details: '' };
        } else{
          loadMantencion();
         }
      }
    });

  }
}).call(this);