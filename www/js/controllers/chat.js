(function() {
  'use strict';

  angular
    .module('WeBarrio.controllers')
    .controller('chatController', chatController);

  function chatController($scope, $state, $localStorage, $ionicHistory, dataAPIService, mensajeService, $stateParams) {

    $scope.currentCondo = $localStorage.currentCondo;
    $scope.currentUser = $localStorage.currentUser;
    $scope.loading = true;
    var page = 1;

    var getAllPeople = function (){
      dataAPIService.getPeopleFromCondo($scope.currentCondo.id).then(function (response){
        $scope.people = _.without(response.data.people, _.findWhere(response.data.people, {id: $scope.currentUser.user.id}));
      });
    };

    $scope.activeTab = 2;

    $scope.selectTab = function(active){
      $scope.activeTab = active;
    };

    $scope.goToConversation = function(person, fromConversation){
      if (fromConversation) {
        $state.go('chat-conversation', {chatId: person.chatId, personId: person.chatId.split("A")[1], deptoNumber: person.deptoNumber});
      } else {
        var chatId = _.min([$scope.currentUser.user.id, person.id]) + "A" + _.max([$scope.currentUser.user.id, person.id]);
        $state.go('chat-conversation', {chatId: chatId, personId: person.id, deptoNumber: person.depto_number});
      }
    };

    $scope.goBack = function (){
      if (_.isNull($ionicHistory.viewHistory().backView)) {
        $state.go("tabs.chat");
      } else {
        $ionicHistory.goBack();
      }
    };

    var loadUser = function(){
      dataAPIService.getUser($stateParams.personId).then(function (userResponse) {
          $scope.user = userResponse.data.user;
          $scope.chatTitle = $scope.user.name;
          $scope.$broadcast('scroll.refreshComplete');
          $scope.loading = false;
          loadChats();
      });
    };

    var loadChat = function (userLoading, page){
      mensajeService.getMessage($stateParams.chatId, page).then(function (response) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.messages = response.$value === null ? [] : response;
        if (!userLoading) {
          loadUser();
        }
      });
    };

    var loadChats = function(){
      mensajeService.getMessages($scope.currentUser.user.id).then(function (response) {
          $scope.conversations = response;
          getAllPeople();
      });
    };

    var saveConversation = function (){
      var chatInfo = {
        chatId: $stateParams.chatId,
        personName: $scope.user.name,
        deptoNumber: $stateParams.deptoNumber,
        createdAt: Date.now(),
        lastMessage: $scope.newMessageText,
      };
      mensajeService.saveConversation($scope.currentUser.user.id, chatInfo).then(function(response){
        console.log(response);
      }, function(error){
        console.log(error);
      });
    };

    var updateLastMessage = function (lastMessage) {
      var currentConversation = _.findWhere($scope.conversations, {chatId: $stateParams.chatId});
      currentConversation.lastMessage = lastMessage;
      mensajeService.updateConversation($scope.currentUser.user.id, currentConversation).then(function(response){
        console.log(response);
      }, function(error){
        console.log(error);
      });
    };

    $scope.loadPastMessages = function () {
      page++;
      loadChat(true, page);
    };

    $scope.$on("$ionicView.beforeEnter", function(){
      if ($state.current.name == "chat-conversation") {
        loadChat();
      } else {
        loadChats();
      }
    });

    $scope.sendMessage = function () {
        var msg = {
            personId: $scope.currentUser.user.id,
            userId: $scope.user.id,
            text: $scope.newMessageText,
            sentAt: Date.now(),
        };
        mensajeService.newMessage($stateParams.chatId, msg).then(function () {
            if ($scope.messages.length === 0) {
              saveConversation();
              loadChat(true);
            } else{
              updateLastMessage(angular.copy($scope.newMessageText));
            }
            $scope.newMessageText = "";
        }, function (error) {
            console.log(error);
        });
    };

  }
}).call(this);