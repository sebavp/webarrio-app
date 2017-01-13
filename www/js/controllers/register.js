(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('registerController', registerController);

    function registerController($scope, $state, $log, Auth, Utils) {
        
        console.info("registerController init");

        $scope.register = function(user) {
          if(angular.isDefined(user)){
          Utils.show();
          Auth.register(user)
            .then(function() {
               Utils.hide();
               console.log("Antes de loguear:" + JSON.stringify(user));
               Utils.alertshow("Successfully","The User was Successfully Created.");
               $state.go('home');
            }, function(err) {
               Utils.hide();
               Utils.errMessage(err);
            });
          }
        };

        
    }




}).call(this);
