angular.module('WeBarrio.services.mensajes', [])
  .service('mensajeService', function($q, $firebaseObject, $firebaseArray, $localStorage, Auth, $ionicPopup, webNotification, CONFIG, $rootScope) {
    var deferred;
    var ref = firebase.database().ref();
    var openMessageModal = function(aviso) {
      var av = aviso || {};
        var alertPopup = $ionicPopup.alert({
         cssClass: "avisoAlert",
         title: av.title || "Aviso",
         template: av.details || "Este es un Aviso",
         okText: "X"
       });

       alertPopup.then(function() {
          Auth.updateNotification(aviso.id).then(function(response){
            console.log(response);
           service.updateNotification(aviso.$id);
          });
       });
    };
    var service = {
      getMessage: function (message_id, page) {
        page = page || 1;
        return $firebaseObject(ref.child("/messages/"+message_id).limitToLast( page * 10 )).$loaded();
      },
      getMessages: function (userId, condoId) {
        deferred = $q.defer();
        $firebaseArray(ref.child("/users/" + userId + "/chats/" + condoId)).$loaded().then(function (data) {
          deferred.resolve(data);
        });
        return deferred.promise;
      },
      getGroup: function(groupId){
        return $firebaseObject(ref.child("groups/" + groupId)).$loaded();
      },
      updateGroup: function (groupId, group) {
        group.updatedAt = Date.now();
        var u = $firebaseObject(ref.child("/groups/" + groupId));
        angular.merge(u, _.pick(group, "groupName", "users", "updatedAt"));
        return u.$save();
      },
      newMessage: function (messageId, message) {
        return $firebaseArray(ref.child("/messages/" + messageId)).$add(message);
      },
      newGroup: function (groupInfo) {
        return $firebaseArray(ref.child("groups")).$add(groupInfo);
      },
      saveConversation: function(userId, condoId, chat){
        var u = $firebaseObject(ref.child("/users/" + userId + "/chats/" + condoId + "/" + chat.personId));
        angular.merge(u, _.pick(chat, "chatId", "condoId", "createdAt", "deptoNumber", "lastMessage", "personId", "personName", "personPhoto", "updatedAt"));
        return u.$save();
      },
      updateConversation: function (userId, condoId, conversation) {
        conversation.updatedAt = Date.now();
        var u = $firebaseObject(ref.child("/users/" + userId + "/chats/" + condoId + "/" + conversation.personId));
        angular.merge(u, _.pick(conversation, "chatId", "condoId", "createdAt", "deptoNumber", "lastMessage", "personId", "personName", "personPhoto", "updatedAt"));
        return u.$save();
      },
      updateGroupConversation: function(userId, condoId, conversation){
        conversation.updatedAt = Date.now();
        var u = $firebaseObject(ref.child("/users/" + userId + "/chats/" + condoId + "/" + conversation.$id));
        angular.merge(u, _.pick(conversation, "chatId", "createdAt", "groupName", "personName", "lastMessage", "personId", "condoId", "condo"));
        return u.$save();
      },
      updateNotification: function (notificationId) {
        var currentUser = $localStorage.currentUser;
        var u = $firebaseObject(ref.child("/users/" + currentUser.user.id + "/notifications/" + notificationId));
        u.seen = true;
        return u.$save();
      },
      startNotiticationListener: function() {
        var currentUser = $localStorage.currentUser;

        $rootScope.$on('cloud:push:notification', function(event, data) {
          console.log("LLEGA NOTIFICACION!!!");
          var msg = data.message;
          console.log(msg);
          alert(msg.title + ': ' + msg.text);
        });

        ref.child("/users/" + currentUser.user.id + "/notifications").limitToLast(1).on('child_added', function(snapshot) {
           var notification = snapshot.val();
           notification.details = notification.text + "\n Fecha: " + notification.start_at_datehour;
           notification.$id = snapshot.getKey();
           if (notification.seen === false) {
            openMessageModal(notification);
            if (!ionic.Platform.isWebView()) {
              webNotification.showNotification(notification.title, {
                body: notification.text,
                icon: CONFIG.notificationIcon,
                autoClose: 4000
              });
            }
           }
        });
      }

    };

    return service;
});
