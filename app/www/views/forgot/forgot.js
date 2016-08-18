(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('forgotController', forgotController);

    function forgotController($scope, $state, Auth) {
        
        console.info("forgotController init");

      $scope.resetpassword = function(user) {
          if(angular.isDefined(user)){
          Auth.resetpassword(user.email)
            .then(function() {
              //console.log("Password reset email sent successfully!");
              $stage.go('login');
            }, function(err) {
               //console.error("Error: ", err);
            });
          }
      };
        
    }




}).call(this);