(function() {
  'use strict';

  angular
    .module('WeBarrio.controllers')
    .controller('chatController', chatController);

  function chatController($scope, $state, $localStorage, $ionicHistory, dataAPIService, mensajeService, $stateParams, $ionicLoading, $timeout, Auth) {

    var page = 1;

    var getAllPeople = function (){
      dataAPIService.getPeopleFromCondo($scope.currentCondo.id).then(function (response){
        $scope.people = _.without(response.data.people, _.findWhere(response.data.people, {id: $scope.currentUser.user.id}));
        if ($state.current.name == "chat-group") {
          $scope.selectedPeople = [];
          _.forEach($scope.people, function(person){
            if (_.contains(_.pluck($scope.currentGroup.users, 'id'), person.id)) {
              person.selected = true;
              $scope.selectedPeople.push(person);
            }
          });
        }
      });
    };

   var loadUser = function(userId){
      dataAPIService.getUser(userId).then(function (userResponse) {
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
          $scope.selectedPeople = [];
          loadChats();
      });
    };

    var loadChat = function (userLoading, page){
      mensajeService.getMessage($stateParams.chatId, page).then(function (response) {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.messages = response.$value === null ? [] : response;
        if (!userLoading) {
          loadUser($stateParams.personId);
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
        personPhoto: $scope.user.image_url,
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
      console.log("updateLastMessage")
      var currentConversation = _.findWhere($scope.conversations, {chatId: $stateParams.chatId});
      currentConversation.lastMessage = lastMessage;
      currentConversation.personId = $stateParams.personId;
      currentConversation.personPhoto = $scope.user.image_url;
      mensajeService.updateConversation($scope.currentUser.user.id, $scope.currentCondo.id, currentConversation).then(function(){
        var otherConversation = angular.copy(currentConversation);
        otherConversation.deptoNumber = $scope.currentDepto.number;
        otherConversation.personId = $scope.currentUser.user.id;
        otherConversation.personName = $scope.currentUser.user.name;
        otherConversation.personPhoto = $scope.currentUser.user.image_url;
        console.log("updateLastMessage1")
        mensajeService.updateConversation($stateParams.personId, $scope.currentCondo.id,  otherConversation).then(function(){
          console.log("both updated");
          Auth.sendPush({condoId: $scope.currentCondo.id, userId: $stateParams.personId, message: lastMessage, depto_number: $scope.currentDepto.number})
        });
      });
    };

    var saveGroupToUser = function(userId, groupInfo){
      console.log("saving", userId);
      mensajeService.saveConversation(userId, $scope.currentCondo.id, groupInfo).then(function(){
        console.log("updated group to ", userId);
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

    $scope.currentCondo = $localStorage.currentCondo;
    $scope.currentDepto = $localStorage.currentDepto;
    $scope.currentUser = $localStorage.currentUser;
    $scope.selectedPeople = [];
    $scope.loading = true;

    $scope.activeTab = 2;

    $scope.selectTab = function(active){
      $scope.activeTab = active;
    };

    $scope.goToConversation = function(person, fromConversation){
      if (fromConversation) {
        if (person.groupName) {
          $state.go('chat-group-conversation', {chatId: person.chatId, groupName: person.groupName});
        } else {
          console.log(person)
          console.log($scope.currentUser)
          $state.go('chat-conversation', {chatId: person.chatId, personId: person.personId, deptoNumber: person.deptoNumber});
        }
      } else {
        var chatId = _.min([$scope.currentUser.user.id, person.id]) + "A" + _.max([$scope.currentUser.user.id, person.id]);
        $state.go('chat-conversation', {chatId: chatId, personId: person.id, deptoNumber: person.depto_number});
      }
    };

    $scope.updateGroup = function(currentGroup, selectedPeople){
      currentGroup.users = selectedPeople;
      mensajeService.updateGroup($stateParams.chatId, currentGroup).then(function () {
        $state.go('chat-group-conversation', {chatId: $stateParams.chatId, groupName: $stateParams.groupName});
      });
    };

    $scope.goBack = function (){
      if (_.isNull($ionicHistory.viewHistory().backView)) {
        $state.go("tabs.chat");
      } else {
        $ionicHistory.goBack();
      }
    };

    $scope.loadPastMessages = function () {
      page++;
      if ($state.current.name == "chat-group-conversation") {
        loadGroupMessages(page);
      } else {
        loadChat(true, page);
      }
    };

    $scope.selectToGroup = function (p) {
      if (p.selected) {
        p.selected = false;
        $scope.selectedPeople = _.without($scope.selectedPeople, _.findWhere($scope.selectedPeople, {id: p.id}));
      } else {
        p.selected = true;
        $scope.selectedPeople.push(p);
      }
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
            console.log("newMessage")
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

    $scope.goToProfile = function () {
      $state.go("public_profile", {personId: $scope.user.id, deptoNumber: $stateParams.deptoNumber, chatId: $stateParams.chatId});
    };

    $scope.goToGroup = function () {
      $state.go("chat-group", {groupName: $stateParams.groupName, chatId: $stateParams.chatId});
    };

    $scope.getConversationImg = function (conversation) {
      if (conversation) {
        return conversation.groupName ? 'img/group-icon.jpg' : conversation.personPhoto; 
      } else {
        return 'img/avatar-thumb.png';
      }
    };

    $scope.getRandomColor = function (userId) {
      return {'color': '#'+ (userId*70).toString(16)};
    };

    $scope.$on("$ionicView.beforeEnter", function(){
      switch ($state.current.name){
        case "tabs.chat":
          loadChats();
          break;
        case 'chat-conversation':
          loadChat();
          break;
        case 'chat-new-message':
        case 'chat-new-group':
          getAllPeople();
          break;
        case 'chat-group':
        case 'chat-group-conversation':
          $scope.chatTitle = $stateParams.groupName;
          loadGroup();
          break;
      }
    });

  }
}).call(this);