angular.module('WeBarrio.services', [])
  .service('dataAPIService', function($q, $http, CONFIG) {
    var deferred;
    var service = {
      getCommonExpenses: function(dptoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/departments/' + dptoId + '/common_expenses'
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getPeopleFromCondo: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/people'
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getUser: function(userId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/users/' + userId 
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
    };
    return service;
});
