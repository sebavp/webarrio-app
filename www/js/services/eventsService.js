angular.module('WeBarrio.services.events', [])
  .service('eventsService', function($q, $http, CONFIG) {
    var service = {
      getInstalaciones: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/events/' + condoId + '/instalaciones'
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      getEvent: function(eventId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/events/detail/' + eventId
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      getEventos: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/events/' + condoId + '/normal_events'
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      getAsambleas: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/events/' + condoId + '/asambleas'
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      getMantenciones: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/events/' + condoId + '/mantenciones'
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      getCarPooling: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/events/' + condoId + '/car_pooling'
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
    };
    return service;
});
