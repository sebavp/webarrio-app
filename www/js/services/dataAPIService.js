angular.module('WeBarrio.services', [])
  .service('dataAPIService', function($q, $http, CONFIG) {
    var deferred;
    var service = {
      getCommonExpenses: function(apartmentId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/apartments/' + apartmentId + '/common_expenses'
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
      getPayments: function(apartmentId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/apartments/' + apartmentId + '/payments'
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      createPayment: function(apartmentId, payment) {
        deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/apartments/' + apartmentId + '/payment',
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
      getApartments: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/apartments'
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
      getHomeUsers: function(apartment) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/users/by_apartment/' + apartment 
        }).then(function(users) {
          deferred.resolve(users);
        });
        return deferred.promise;
      },
      addUserToHome : function(newUser) {
        const deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/users/add_to_apartment',
          data: newUser,
        })
        .then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      removeHomeUser: function(data) {
        $http({
          method: 'DELETE',
          url: CONFIG.apiURL + '/users/' + data.user + '/from_apartment/' + data.apartment
        })
      },
      getUserNotifications: function(userId, condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/feed/' + userId + "/" + condoId
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      updatePhone: function(condoId, phone, label) {
        deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/condo/' + condoId + '/phone/' + label,
          data: phone 
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      sendSOS: function(condoId, userId, apartmentNumber) {
        deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/condos/' + condoId + '/sos',
          data: {user_id: userId, apartment_number: apartmentNumber}
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
    };
    return service;
});
