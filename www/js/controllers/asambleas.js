(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('asambleasController', asambleasController);

  function asambleasController($rootScope, $scope, $state, $ionicHistory, dataAPIService, $localStorage, eventsService, $stateParams, FileUploader, CONFIG, $ionicLoading) {

    var currentCondo = $localStorage.currentCondo;
    var currentUser = $localStorage.currentUser;
    var uploader = $scope.uploader = new FileUploader({autoUpload: false});

    $scope.isAdmin = function () {
      return currentUser.user.role == 'superadmin' || currentUser.user.role == "admin";
    };

    // CALLBACKS
    uploader.onAfterAddingAll = function(addedFileItems) {
      $scope.newEventImage = addedFileItems[0];
    };

    uploader.onCompleteAll = function() {
        $ionicLoading.hide();
        $state.go('tabs.dashboard-asambleas');
    };
    
    $scope.goBack = function (){
      if ($state.current.name == "tabs.dashboard-asambleas") {
        $state.go("tabs.dashboard");
      } else{
        $state.go("tabs.dashboard-asambleas");
      }
    };

    $scope.goToCurrentAsamblea = function (){
      $state.go('dashboard-asambleas-detail', {event_id: $scope.currentAsamblea.id});
    };

    var loadAsambleas = function (){
      eventsService.getAsambleas(currentCondo.id).then(function (response){
        $scope.asambleas = angular.copy(response.asambleas);
      }, function(error){
        console.log(error);
      });
    };

    var loadAsamblea = function (){
      eventsService.getEvent($stateParams.event_id).then(function (response){
        var userInVotantesYes = _.findWhere(response.event.vote_details.yes, {user_id: currentUser.user.id} );
        var userInVotantesNo = _.findWhere(response.event.vote_details.no, {user_id: currentUser.user.id});
        $scope.currentAsamblea = response.event;
        if (userInVotantesYes || userInVotantesNo) {
          $scope.currentAsamblea.userVoted = true;
          $scope.currentAsamblea.userVote = userInVotantesYes ? true : false;
        }
      }, function(error){
        console.log(error);
      });
    };

    $scope.saveAsamblea = function(asamblea){
      asamblea.user_id = currentUser.user.id;
      $ionicLoading.show({template: "Creando Asamblea..."});
      eventsService.createEvent('asambleas', asamblea, currentCondo.id).then(function(response){
        $scope.uploader.url = CONFIG.apiURL + '/events/image/' + response.asamblea.id;
        if ($scope.uploader.queue.length > 0) {
          $scope.uploader.queue[0].url = CONFIG.apiURL + '/events/image/' + response.asamblea.id;
          $scope.uploader.uploadAll();
        }
      });
    };

   $scope.newVote = function(confirmed){
      eventsService.newAssistent({user_id: currentUser.user.id, event_id: parseInt($stateParams.event_id), confirmed: confirmed}).then(function(){
        $scope.currentAsamblea.userVoted = true;
        $scope.currentAsamblea.userVote = confirmed;
        if (confirmed) {
          $scope.currentAsamblea.vote_details.yes.push({user_id: currentUser.user.id});
        } else {
          $scope.currentAsamblea.vote_details.no.push({user_id: currentUser.user.id});
        }
      });
    };

    $scope.$on('$ionicView.beforeEnter', function (){
      currentUser = $localStorage.currentUser;
      if ($state.current.name == "tabs.dashboard-asambleas") {
        loadAsambleas();
      } else {
        if ($state.current.name === "dashboard-asambleas-new") {
          $scope.newAsamblea = {name: "", details: '' };
        } else{
          loadAsamblea();
         }
      }
    });
  }
}).call(this);