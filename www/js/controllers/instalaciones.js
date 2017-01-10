(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('instalacionesController', instalacionesController);

  function instalacionesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams) {
    var currentCondo =  $localStorage.currentCondo;
    var currentUser =  $localStorage.currentUser;
    $scope.currentUser = currentUser.user;
    var allInstalaciones = [];

    $scope.goBack = function (){
      if ($state.current.name == "dashboard-instalaciones") {
        $state.go("tabs.dashboard");
      } else {
        $state.go("dashboard-instalaciones");
      }
    };

    var loadInstalaciones = function (){
      eventsService.getInstalaciones(currentCondo.id).then(function (response){
        allInstalaciones = angular.copy(response.instalaciones);
        $scope.filterBy(2);
      }, function(error){
        console.log(error);
      });
    };

    var loadInstalacion = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentEvent = response.event;
      }, function(error){
        console.log(error);
      });
    };

    $scope.createReservation = function (reservation){
      reservation.user_id = currentUser.user.id;
      eventsService.createEvent('instalaciones', reservation, currentCondo.id).then(function(){
        $state.go('dashboard-instalaciones');
      });
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
          $scope.instalaciones = _.filter(allInstalaciones, function(instalacion) {
            var currentDate = (new Date(instalacion.event_date)).getTime();
            var start = (new Date()).setHours(0,0,0,0);
            var end = (new Date()).setHours(23,59,59,999);
            return currentDate >= start && currentDate < end;
          });
          break;
        case 2:
          $scope.instalaciones = _.filter(allInstalaciones, function(instalacion) {
            var currentDate = new Date(instalacion.event_date);
            var start = getMonday(new Date);
            var end = getNextDayOfWeek(new Date, 0);
            return currentDate >= start && currentDate < end;
          });
          break;
        case 3:
          $scope.instalaciones = _.filter(allInstalaciones, function(instalacion) {
            var currentDate = new Date(instalacion.event_date);
            var today = new Date(), y = today.getFullYear(), m = today.getMonth();
            var start = new Date(y, m, 1);
            var end = new Date(y, m + 1, 0);
            return currentDate >= start && currentDate < end;
          });
          break;
      }
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "dashboard-instalaciones") {
        loadInstalaciones();
      }
      if ($state.current.name == "dashboard-instalaciones-detail") {
        loadInstalacion();
      }
      $scope.newEvent = {};
    });

  }
}).call(this);