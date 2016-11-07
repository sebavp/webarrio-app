(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('loginController', loginController);

    function loginController($scope, $state, $log, Utils, Auth, $localStorage) {
        
        console.info("loginController init");

          $scope.$on('$ionicView.beforeEnter', function (){
            if ($state.current.name == "forgot") {
              $scope.forgot = true
            }
          });

          $scope.signIn = function (user) {
            if(angular.isDefined(user)){
              Utils.show();
              Auth.login(user).then(function(authData) {
                $localStorage.currentUser = authData.data;
                Utils.hide();
                $state.go('tabs.home');
              }, function(err) {
                console.log(err)
                Utils.hide();
                Utils.errMessage(err.data.message);
              });
            }
          };

          $scope.resetPassword = function(user) {
            if(angular.isDefined(user)){
              Utils.show();
              Auth.resetpassword(user)
                .then(function() {
                  Utils.hide();
                  Utils.alertshow("Exito.","La clave fue enviada a su correo.");
                  $stage.go('login');
                }, function(err) {
                  Utils.hide();
                  Utils.errMessage(err.data.message);
                   //console.error("Error: ", err);
                });
            }
          };

        
    }




}).call(this);
