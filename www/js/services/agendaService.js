angular.module('WeBarrio.services.agenda', [])
  .service('agendaService', function($q, $http, CONFIG) {

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
    };
    return service;
});
