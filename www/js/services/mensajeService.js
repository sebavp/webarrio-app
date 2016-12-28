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
        $firebaseArray(ref.child("/users/" + userId + "/messages")).$loaded().then(function (data) {
          angular.forEach(data, function (v, messageId) {
            $firebaseObject(ref.child("/messages/" + messageId )).$loaded().then(function (response) {
              messages.push(response);
            });
          });
          deferred.resolve(messages);
        });
        return deferred.promise;
      },
      newMessage: function (messageId, message) {
        return $firebaseArray(ref.child("/messages/" + messageId)).$add(message);
      },
    };
    return service;
});
