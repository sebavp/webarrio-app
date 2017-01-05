angular.module('WeBarrio.services.agenda', [])
  .service('agendaService', function($q, $http, CONFIG) {
    var deferred;
    var service = {
      getAllProfesions: function(condoId) {
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/agenda'
        }).then(function(agenda) {
          deferred.resolve(agenda.data);
        });
        return deferred.promise;
      },
      loadContact: function(condoId, contactId){
        deferred = $q.defer();
        $http({
          method: 'GET',
          url: CONFIG.apiURL + '/condos/' + condoId + '/agenda/' + contactId
        }).then(function(agenda) {
          deferred.resolve(agenda.data);
        });
        return deferred.promise;
      },
      saveNewContact: function(condoId, newContact){
        deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/condos/' + condoId + '/agenda',
          data: newContact
        }).then(function(agenda) {
          deferred.resolve(agenda.data);
        });
        return deferred.promise;
      },
      newReview: function(condoId, review){
        deferred = $q.defer();
        $http({
          method: 'POST',
          url: CONFIG.apiURL + '/condos/' + condoId + '/agenda/' + review.contact_id,
          data: review
        }).then(function(agenda) {
          deferred.resolve(agenda.data);
        });
        return deferred.promise;
      }
    };
    return service;
});
