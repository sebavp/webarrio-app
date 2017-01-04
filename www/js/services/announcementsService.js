angular.module('WeBarrio.services.announcements', [])
  .service('announcementsService', function($q, $http, CONFIG) {
    var service = {
      getAnuncio: function(announcementId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/announcements/detail/' + announcementId
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      getMascotas: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/announcements/' + condoId + '/mascotas'
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      getRecomendaciones: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/announcements/' + condoId + '/recomendaciones'
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      getAnuncios: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/announcements/' + condoId + '/anuncios'
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      getClasificados: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/announcements/' + condoId + '/clasificados'
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      },
      createAnnouncement: function(type, newAnnouncement, condoId){
        deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/announcements/' + condoId + '/' + type,
          data: newAnnouncement
        }).then(function(response) {
          deferred.resolve(response.data);
        });
        return deferred.promise;
      }
    };
    return service;
});
