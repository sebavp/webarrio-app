(function() {
  'use strict';

  angular
    .module('WeBarrio.controllers')
    .controller('chatController', chatController);

  function chatController($scope, $state, $localStorage, $ionicHistory, dataAPIService, mensajeService, $stateParams) {
    console.info("chatController init");

    $scope.currentCondo = $localStorage.currentCondo;
    $scope.currentUser = $localStorage.currentUser

    console.log($scope.currentCondo);
    var getAllPeople = function (){
      dataAPIService.getPeopleFromCondo($scope.currentCondo.id).then(function (response){
        console.log(response)
        $scope.people = response.data.people;
      })
    };

    $scope.activeTab = 2;

    $scope.selectTab = function(active){
      $scope.activeTab = active;
    };

    $scope.goToConversation = function(person){
      var chatId = _.min([$scope.currentUser.user.id, person.id]) + "A" + _.max([$scope.currentUser.user.id, person.id])
      $state.go('chat-conversation', {chatId: chatId, personId: person.id})
    }

    $scope.goBack = function (){
      if (_.isNull($ionicHistory.viewHistory().backView)) {
        $state.go("tabs.home")
      } else{
        $ionicHistory.goBack();
      }
    };


    $scope.chatTitle = "Conversación";

    var loadChat = function (){
      mensajeService.getMessage($stateParams.chatId).then(function (response) {
          
          $scope.messages = response;

          dataAPIService.getUser($stateParams.personId).then(function (userResponse) {
              $scope.user = userResponse.data.user;
              console.log($scope.user)
              $scope.$broadcast('scroll.refreshComplete');
          });

      });
    }

    var loadChats = function(){
      mensajeService.getMessages($scope.currentUser.user.id).then(function (response) {
          
          $scope.conversations = response;
          console.log(response)
          getAllPeople();
      });
    }

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
        
        mensajeService.newMessage($stateParams.chatId, msg).then(function (response) {
            $scope.newMessageText = "";
        }, function (error) {
            console.log(error);
        });
    };

  }
}).call(this);