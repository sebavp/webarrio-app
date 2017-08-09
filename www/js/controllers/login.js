(function() {
  'use strict';
  angular
    .module('WeBarrio.controllers')
    .controller('loginController', loginController);
  function loginController($scope, $state, $log, Utils, Auth, $localStorage, $timeout, webNotification, CONFIG) {
    console.info("loginController init");

    $scope.$on('$ionicView.beforeEnter', function (){
      if ($state.current.name == "forgot") {
        $scope.forgot = true;
      }
      if (Auth.isSession() === true) {
        $state.go('tabs.home');
      }
    });

    $scope.signIn = function (user) {
      if(angular.isDefined(user)){
        Utils.show();
        Auth.login(user).then(function(authData) {
          //console.log(JSON.stringify(authData));
          $localStorage.currentUser = authData.data;
          $localStorage.currentCondo = authData.data.condos[0];
          $localStorage.currentDepto = authData.data.condos[0].departments[0];
          Utils.hide();
          webNotification.showNotification('Bienvenido a WeBarrio!', {
              body: 'Las notificaciones se mostrarán por acá.',
              icon: CONFIG.notificationIcon,
              autoClose: 4000 //auto close the notification after 4 seconds (you can manually close it via hide function)
          });
          $state.go('tabs.home');
        }, function(err) {
          //console.log(JSON.stringify(err));
          Utils.hide();
          $scope.error = {show: true, msg: err.data.message};
          $timeout(function() {
            $scope.error.show = false;
          }, 3000);
          // Utils.errMessage(err.data.message);
        });
      }
    };

    $scope.resetPassword = function(user) {
      if(angular.isDefined(user)){
        Utils.show();
        Auth.resetpassword(user)
          .then(function(response) {
            Utils.hide();
            Utils.alertshow("Exito.",response.data.message);
            $state.go('login');
          }, function(err) {
            Utils.hide();
            Utils.errMessage(err.data.message);
             //console.error("Error: ", err);
          });
      }
    };
  }
}).call(this);
