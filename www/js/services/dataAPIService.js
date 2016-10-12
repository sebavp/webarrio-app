angular.module('WeBarrio.services', [])
  .service('dataAPIService', function($q, $http, CONFIG) {
    var service = {
      getUser: function() {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
    };
    return service;
});
