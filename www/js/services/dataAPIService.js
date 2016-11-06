angular.module('WeBarrio.services', [])
  .service('dataAPIService', function($q, $http, CONFIG) {
    var service = {
      getUser: function(userId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + 'users/' + userId
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
    };
    return service;
});
