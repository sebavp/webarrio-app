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
        return $http(req)
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
        return $http(req)
    },

		// changePassword: function(user) {
		// 	return auth.$changePassword({email: user.email, oldPassword: user.oldPass, newPassword: user.newPass});
		// }

	};
	return Auth;

});
