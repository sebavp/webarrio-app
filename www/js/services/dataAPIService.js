angular.module('WeBarrio.services', [])
  .service('dataAPIService', function($q, $http, CONFIG) {
    var deferred;
    var service = {
      getCommonExpenses: apartmentId => {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/apartments/' + apartmentId + '/common_expenses'
        }).then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getAllCommonExpenses: condoId => {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/common_expenses'
        }).then(function(userData) {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getCommonExpensesInMonth: (condoId, month, year) => {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/common_expenses/' + year + "/" + month
        }).then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getPayments: apartmentId => {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/apartments/' + apartmentId + '/payments'
        }).then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      createPayment: (apartmentId, payment) => {
        deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/apartments/' + apartmentId + '/payment',
          data: payment
        }).then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getAllPayments: condoId => {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/payments'
        }).then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getApartments: condoId => {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/apartments'
        }).then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getPeopleFromCondo: condoId => {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/people'
        }).then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getUser: userId => {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/users/' + userId 
        }).then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      getHomeUsers: apartment => {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/users/by_apartment/' + apartment 
        }).then(users => {
          deferred.resolve(users);
        });
        return deferred.promise;
      },
      addUserToHome : newUser => {
        const deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/users/add_to_apartment',
          data: newUser,
        })
        .then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      removeHomeUser: data => {
        $http({
          method: 'DELETE',
          url: CONFIG.apiURL + '/users/' + data.user + '/from_apartment/' + data.apartment
        })
      },
      getUserNotifications: (userId, condoId) => {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/feed/' + userId + "/" + condoId
        }).then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
      updatePhone: (condoId, phone, label) => {
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
      sendSOS: (condoId, userId, apartmentNumber) => {
        deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/condos/' + condoId + '/sos',
          data: {user_id: userId, apartment_number: apartmentNumber}
        }).then(userData => {
          deferred.resolve(userData);
        });
        return deferred.promise;
      },
    };
    return service;
});
