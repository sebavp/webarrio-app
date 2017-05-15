(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('sideMenuController', sideMenuController);
  function sideMenuController($scope, $state, $log, $localStorage, $ionicHistory, dataAPIService, FileUploader, CONFIG, Auth, $ionicLoading, $stateParams) {
    
    $scope.toDate = new Date();
    $scope.fromDate = new Date(100);

    $scope.goBack = function (){
      if (_.isNull($ionicHistory.viewHistory().backView)) {
        if ($scope.isProfile) {
          $state.go("tabs.home");
        } else {
          $state.go('chat-conversation', {chatId: $stateParams.chatId, personId: $stateParams.personId, deptoNumber: $stateParams.deptoNumber});
        }
      } else {
        $ionicHistory.goBack();
      }
    };

   var uploader = $scope.uploader = new FileUploader({autoUpload: false});
    
    // CALLBACKS
    uploader.onAfterAddingAll = function(addedFileItems) {
      $scope.newEventImage = addedFileItems[0];
    };

    uploader.onCompleteAll = function() {
        $ionicLoading.hide();
        $state.go('profile');
    };

    var loadCurrentUser = function (){
      dataAPIService.getUser($localStorage.currentUser.user.id).then(function(response){
        $localStorage.currentUser.user = response.data.user;
        $scope.currentUser = response.data.user;
      });
    };

    var loadProfile = function (userId){
      dataAPIService.getUser(userId).then(function(response){
        $scope.currentUser = response.data.user;
      });
    };

    $scope.updateProfile = function (user){
      $ionicLoading.show();
      Auth.updateProfile(user).then(function (response){
        var imageUrl =  CONFIG.apiURL + '/users/' + response.data.user.id + '/image';
        $scope.uploader.url = imageUrl;
        if ($scope.uploader.queue.length > 0) {
          $scope.uploader.queue[0].url = imageUrl;
          $scope.uploader.uploadAll();
        } else {
          $ionicLoading.hide();
          $state.go('profile');
        }

      });
    };

    $scope.$on('$ionicView.beforeEnter', function(){
      if ($state.current.name == "profile") {
        loadCurrentUser();
        $scope.isProfile = true;
      } else {
        loadProfile($stateParams.personId);
      }
    });
  }
}).call(this);