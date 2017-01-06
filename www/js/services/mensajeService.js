angular.module('WeBarrio.services.mensajes', [])
  .service('mensajeService', function($q, $firebaseObject, $firebaseArray) {
    var deferred;
    var ref = firebase.database().ref();
    var service = {
      getMessage: function (message_id, page) {
        page = page || 1;
        return $firebaseObject(ref.child("/messages/"+message_id).limitToLast( page * 10 )).$loaded();
      },
      getMessages: function (userId) {
        deferred = $q.defer();
        $firebaseArray(ref.child("/users/" + userId + "/chats")).$loaded().then(function (data) {
          deferred.resolve(data);
        });
        return deferred.promise;
      },
      newMessage: function (messageId, message) {
        return $firebaseArray(ref.child("/messages/" + messageId)).$add(message);
      },
      saveConversation: function(userId, chat){
        return $firebaseArray(ref.child("/users/" + userId + "/chats")).$add(chat).then(function () {
          $firebaseArray(ref.child("/users/" + chat.personId + "/chats")).$add(chat)
        });
      },
      updateConversation: function (userId, conversation) {
        conversation.updatedAt = Date.now();
        var u = $firebaseObject(ref.child("/users/" + userId + "/chats/" + conversation.$id));
        angular.merge(u, _.pick(conversation, "chatId", "createdAt", "deptoNumber", "personName", "lastMessage", "updatedAt"));
        return u.$save();
      }
    };
    return service;
});
