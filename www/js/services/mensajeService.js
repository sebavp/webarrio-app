angular.module('WeBarrio.services.mensajes', [])
  .service('mensajeService', function($q, $firebaseObject, $firebaseArray) {
    var deferred;
    var ref = firebase.database().ref();
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
      newMessage: function (messageId, message) {
        return $firebaseArray(ref.child("/messages/" + messageId)).$add(message);
      },
      newGroup: function (groupInfo) {
        return $firebaseArray(ref.child("groups")).$add(groupInfo);
      },
      saveConversation: function(userId, condoId, chat){
        return $firebaseArray(ref.child("/users/" + userId + "/chats/" + condoId)).$add(chat);
      },
      updateConversation: function (userId, condoId, conversation) {
        conversation.updatedAt = Date.now();
        var u = $firebaseObject(ref.child("/users/" + userId + "/chats/" + condoId + "/" + conversation.$id));
        angular.merge(u, _.pick(conversation, "chatId", "createdAt", "deptoNumber", "personName", "lastMessage", "updatedAt", "personId", "condoId"));
        return u.$save();
      },
      updateGroupConversation: function(userId, condoId, conversation){
        conversation.updatedAt = Date.now();
        var u = $firebaseObject(ref.child("/users/" + userId + "/chats/" + condoId + "/" + conversation.$id));
        angular.merge(u, _.pick(conversation, "chatId", "createdAt", "groupName", "personName", "lastMessage", "personId", "condoId", "condo"));
        return u.$save();
      }
    };
    return service;
});
