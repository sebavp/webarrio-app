(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('instalacionesController', instalacionesController);

  function instalacionesController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams, ionicDatePicker, ionicTimePicker) {
    var currentDepto =  $localStorage.currentDepto;
    var currentCondo =  $localStorage.currentCondo;
    console.log(currentCondo)
    console.info("instalacionesController init");
    $scope.activeTab = 2;
    $scope.selectTab = function(active){
      $scope.activeTab = active;
    };
    $scope.goBack = function (){
      $state.go("tabs.dashboard");
    };

    var loadInstalaciones = function (){
      eventsService.getInstalaciones(currentCondo.id).then(function (response){
        $scope.instalaciones = response.instalaciones;
      }, function(error){
        console.log(error)
      });
    }

    var loadInstalacion = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        $scope.currentEvent = response.event;
      }, function(error){
        console.log(error)
      });
    }

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "dashboard-instalaciones") {
        loadInstalaciones();
      }
      if ($state.current.name == "dashboard-instalaciones-detail") {
        loadInstalacion();
      }
      $scope.newEvent = {}
    })

    $scope.openDatepicker = function(){
      var today = new Date();
      var twoWeeks = new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000));

      ionicDatePicker.openDatePicker({
        callback: function(val) {
          $scope.newEvent.event_date = new Date(val);
        },
        from: today,
        to: twoWeeks,
        mondayFirst: true,
        closeOnSelect: true,
        templateType: 'popup'
      });

    }

    $scope.openTimepicker = function(){
      ionicTimePicker.openTimePicker({
        callback: function (val) {      //Mandatory
          $scope.newEvent.event_date = new Date(val * 1000);
        },
      });
    }
  }
}).call(this);