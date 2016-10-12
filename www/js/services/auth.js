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

   //  logout: function() {
   //    auth.$signOut();
			// console.log("Usuario Sale.");
   //  },

		// resetpassword: function(email) {
		// 	return auth.$sendPasswordResetEmail(
		// 		  email
		// 		).then(function() {
		// 			Utils.alertshow("Exito.","La clave fue enviada a su correo.");
		// 		}).catch(function(error) {
		// 			Utils.errMessage(error);
		// 		});
  //   },

		// changePassword: function(user) {
		// 	return auth.$changePassword({email: user.email, oldPassword: user.oldPass, newPassword: user.newPass});
		// }

	};
	return Auth;

});
