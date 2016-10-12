(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('loginController', loginController);

    function loginController($scope, $state, $log, Utils, Auth, $localStorage) {
        
        console.info("loginController init");

          $scope.signIn = function (user) {
            if(angular.isDefined(user)){
              Utils.show();
              Auth.login(user)
              .then(function(authData) {
                $localStorage.currentUser = authData.data;
                Utils.hide();
                $state.go('tabs.home');
              }, function(err) {
                Utils.hide();
                Utils.errMessage(err);
              });
            }
          };

        
    }




}).call(this);
