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
      getAllCommonExpenses: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/common_expenses'
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getCommonExpensesInMonth: function(condoId, month, year) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/common_expenses/' + year + "/" + month
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getPayments: function(dptoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/departments/' + dptoId + '/payments'
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      createPayment: function(deptoId, payment) {
        deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/departments/' + deptoId + '/payment',
          data: payment
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getAllPayments: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/payments'
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getDepartments: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/departments'
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
