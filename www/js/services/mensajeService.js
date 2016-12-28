angular.module('WeBarrio.services.mensajes', [])
  .service('mensajeService', function($q, $firebaseObject, $firebaseArray, CONFIG) {

    var ref = firebase.database().ref();
    var service = {
      getMessage: function (message_id) {
        return $firebaseObject(ref.child("/messages/"+message_id)).$loaded();
      },
      getMessages: function (userId) {
        deferred = $q.defer();
        var messages = [];
        $firebaseArray(ref.child("/users/" + userId + "/chats")).$loaded().then(function (data) {
          // angular.forEach(data, function (v) {
          //   $firebaseObject(ref.child("/messages/" + v.chatId )).$loaded().then(function (response) {
          //     console.log(response)
          //     messages.push(response);
          //   });
          // });
          // deferred.resolve(messages);
          deferred.resolve(data);
        });
        return deferred.promise;
      },
      newMessage: function (messageId, message) {
        return $firebaseArray(ref.child("/messages/" + messageId)).$add(message);
      },
      saveConversation: function(userId, chat){
        return $firebaseArray(ref.child("/users/" + userId + "/chats")).$add(chat)
      }
    };
    return service;
});
