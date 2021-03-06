angular.module('WeBarrio.services.auth', [])
  .service('Auth', function($http, $log, Utils, CONFIG, $localStorage) {
  var Auth = {
    login: function(user) {
        var req = {
          method: 'POST',
          url: CONFIG.apiURL + "/users/sign_in",
          data: {
            user: {
              email: user.email,  
              password: user.password
            }
          },
        };
        return $http(req);
    },
    logout: function() {
			console.log("Usuario Sale.");
    },
    isSession: function(){
      return ($localStorage.currentUser !== undefined &&
          $localStorage.currentCondo !== undefined &&
          $localStorage.currentApartment !== undefined);
    },
		resetpassword: function(user) {
        var req = {
          method: 'POST',
          url: CONFIG.apiURL + "/users/reset",
          data: {
            user: {
              email: user.email,
            }
          },
        };
        return $http(req);
    },
    updateProfile: function(user){
        var req = {
          method: 'PUT',
          url: CONFIG.apiURL + "/users/" + user.id,
          data: user
        };
        return $http(req);
    },
    setDevice: function(userId, device){
        var req = {
          method: 'POST',
          url: CONFIG.apiURL + "/users/" + userId + "/device",
          data: device
        };
        return $http(req);
    },
    getAvisos: function(userId, condoId) {
      return $http({
        method: 'GET',
        url: CONFIG.apiURL + '/current_avisos/'+ userId + "/" + condoId
      });
    },
    updateNotification: function(notificationId){
      return $http({
        method: "PUT",
        url: CONFIG.apiURL + '/current_avisos/'+ notificationId 
      });
    },
    sendPush: function (pushContent) {
      return $http({
        method: "POST",
        url: CONFIG.apiURL + '/condos/' + pushContent.condoId + "/send_push" 
      });
    }

	};
	return Auth;
});
