(function() {
  'use strict';

  angular
    .module('WeBarrio.controllers')
    .controller('chatController', chatController);

  function chatController($scope, $state, $localStorage, $ionicHistory, dataAPIService, mensajeService, $stateParams, $ionicLoading, $timeout) {

    $scope.currentCondo = $localStorage.currentCondo;
    $scope.currentDepto = $localStorage.currentDepto;
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
        if (person.isGroup) {
          $state.go('chat-group-conversation', {chatId: person.chatId, groupName: person.groupName});
        } else {
          $state.go('chat-conversation', {chatId: person.chatId, personId: person.chatId.split("A")[1], deptoNumber: person.deptoNumber});
        }
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
          loadChats(true);
      });
    };


    var loadGroupMessages = function (page){
      mensajeService.getMessage($stateParams.chatId, page).then(function (response) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.messages = response.$value === null ? [] : response;
        $scope.loading = false;
      });
    };


    var loadGroup = function(){
      mensajeService.getGroup($stateParams.chatId).then(function (response) {
          $scope.currentGroup = response;
          console.log(response);
          loadChats();
      });
    };

    var loadChat = function (userLoading, page){
      mensajeService.getMessage($stateParams.chatId, page).then(function (response) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.messages = response.$value === null ? [] : response;
        if (!userLoading) {
          loadUser(true);
        }
      });
    };

    var loadChats = function(fromConversation){
      mensajeService.getMessages($scope.currentUser.user.id, $scope.currentCondo.id).then(function (response) {
          $scope.conversations = response;
          if (!fromConversation) {
            getAllPeople();
          }
          if ($state.current.name == "chat-group-conversation") {
            loadGroupMessages();
          }
      });
    };


    var saveConversation = function (){
      var chatInfo = {
        chatId: $stateParams.chatId,
        personId: $stateParams.personId,
        personName: $scope.user.name,
        deptoNumber: $stateParams.deptoNumber,
        createdAt: Date.now(),
        condoId: $scope.currentCondo.id,
        lastMessage: angular.copy($scope.newMessageText),
      };
      mensajeService.saveConversation($scope.currentUser.user.id, $scope.currentCondo.id, chatInfo).then(function(){
        chatInfo.personId =  $scope.currentUser.user.id;
        chatInfo.personName =  $scope.currentUser.user.name;
        chatInfo.deptoNumber = $scope.currentDepto.number;
        mensajeService.saveConversation($stateParams.personId, $scope.currentCondo.id, chatInfo).then(function(){
          console.log("both created");
        });
      });
    };

    var updateLastMessage = function (lastMessage) {
      var currentConversation = _.findWhere($scope.conversations, {chatId: $stateParams.chatId});
      currentConversation.lastMessage = lastMessage;
      currentConversation.personId = $stateParams.personId;
      mensajeService.updateConversation($scope.currentUser.user.id, $scope.currentCondo.id, currentConversation).then(function(){
        var otherConversation = angular.copy(currentConversation);
        otherConversation.deptoNumber = $scope.currentDepto.number;
        otherConversation.personName = $scope.currentUser.user.name;
        mensajeService.updateConversation($stateParams.personId,$scope.currentCondo.id,  otherConversation).then(function(){
          console.log("both updated");
        });
      });
    };

    $scope.loadPastMessages = function () {
      page++;
      if ($state.current.name == "chat-group-conversation") {
        loadGroupMessages(page);
      } else {
        loadChat(true, page);
      }
    };

    $scope.$on("$ionicView.beforeEnter", function(){
      if ($state.current.name == "chat-conversation" || $state.current.name == "chat-group-conversation" ) {
        if ($state.current.name == "chat-group-conversation") {
          $scope.chatTitle = $stateParams.groupName;
          loadGroup();
        } else{
          loadChat();
        }
      } else {
        loadChats();
        $scope.selectedPeople = [];
        $scope.newGroupName = '';
      }
    });

    $scope.selectToGroup = function (p) {
      if (p.selected) {
        p.selected = false;
        $scope.selectedPeople = _.without($scope.selectedPeople, _.findWhere($scope.selectedPeople, {id: p.id}));
      } else {
        p.selected = true;
        $scope.selectedPeople.push(p);
      }
    };

    var saveGroupToUser = function(userId, groupInfo){
      console.log("saving", userId);
      mensajeService.saveConversation(userId, $scope.currentCondo.id, groupInfo).then(function(){
        console.log("updated group to ", userId);
      });
    };

    $scope.createGroup = function (groupName, groupPeople) {

        $ionicLoading.show({template: "Creando Grupo"});
        groupPeople.push(angular.copy($scope.currentUser.user));
        var allNewUsers = {};
        angular.forEach(groupPeople, function (m){
          allNewUsers[m.id] = {id: m.id, name: m.name };
        });
        var groupInfo = {
          users: allNewUsers,
          groupName: groupName,
          createdAt: Date.now(),
          condo: $scope.currentCondo.name,
          condoId: $scope.currentCondo.id
        };
        var count = 0;
        mensajeService.newGroup(groupInfo).then(function(response){
          angular.forEach(groupInfo.users, function(user){
            groupInfo.chatId = response.key;
            groupInfo.isGroup = true;
            groupInfo.lastMessage = "Has sido agregado...";
            $timeout(function() {
              saveGroupToUser(angular.copy(user.id), angular.copy(groupInfo));
              count = count + 1;
              if (count == groupPeople.length) {
                $ionicLoading.hide();
                $state.go('chat-group-conversation', {chatId: groupInfo.chatId, groupName: groupInfo.groupName});
              }
            }, 10);
          });

        });
    };

    var updateLastMessageGroup = function(userId, lastMessage){
      console.log("saving", userId);
      var currentConversation = _.findWhere($scope.conversations, {chatId: $stateParams.chatId});
      currentConversation.lastMessage = lastMessage;
      currentConversation.groupName = $stateParams.groupName;
      currentConversation.isGroup = true;
      mensajeService.updateGroupConversation(userId, $scope.currentCondo.id, currentConversation).then(function(){
        console.log("updated", userId);
      });
    };

    $scope.sendMessageToGroup = function(){
      if (!$scope.newMessageText || $scope.newMessageText === "") return false;
        var msg = {
            personId: $scope.currentUser.user.id,
            personName: $scope.currentUser.user.name,
            text: $scope.newMessageText,
            sentAt: Date.now(),
        };
        mensajeService.newMessage($stateParams.chatId, msg).then(function () {
          if ($scope.messages.length === 0) {
            $scope.newMessageText = "";
            loadGroupMessages();
          } else{
            var lastMessage = angular.copy($scope.newMessageText);
            $scope.newMessageText = "";
            angular.forEach($scope.currentGroup.users, function(user){
              $timeout(function() {
                updateLastMessageGroup(user.id, lastMessage);
              }, 10);
            });
          }
        }, function (error) {
            console.log(error);
        });
    };

    $scope.sendMessage = function () {
        if (!$scope.newMessageText || $scope.newMessageText === "") return false;
        var msg = {
            personId: $scope.currentUser.user.id,
            personName: $scope.currentUser.user.name,
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