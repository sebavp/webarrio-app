angular.module('WeBarrio.services.auth', [])
  .service('Auth', function($http, $log, Utils, CONFIG) {
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
          data: user,
        };
        return $http(req);
    }
	};
	return Auth;
});
