(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('loginController', loginController);

    function loginController($scope, $state, $log, Utils, Auth) {
        
        console.info("loginController init");

          $scope.signIn = function (user) {
            $log.log("Enviado");
            if(angular.isDefined(user)){
            Utils.show();
            Auth.login(user)
              .then(function(authData) {
              
              $log.log("id del usuario:" + authData);
               Utils.hide();
              $state.go('tabs.home');
              $log.log("Starter page","Home");

              }, function(err) {
                Utils.hide();
                 Utils.errMessage(err);
              });
            }
          };

        
    }




}).call(this);
// angular.module('WeBarrio.controllers').controller('loginController', function ($scope, $state, $cordovaOauth, $localStorage, $location, $http, $ionicPopup, $firebaseAuth, $firebaseObject, $log, Auth, FURL, Utils) {
//   //var ref = new Firebase(FURL);
//   var auth = $firebaseAuth();
//   //firebase.initializeApp(FURL);
//   var ref = firebase.database().ref();
//   var userkey = "";

  
/* SEEMS NOT WORKING WELL

  $scope.loginWithGoogle =  function(){
  var provider = new firebase.auth.GoogleAuthProvider();

 firebase.auth().signInWithPopup(provider).then(function(result) {

    $log.log("Authenticated successfully with payload:", angular.toJson(result));
    $state.go('home');
  
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  $log.error("error:", angular.toJson(error));
});
  ;
  };

*/

/* SEEMS NOT WORKING WELL
  $scope.loginWithFacebook =  function(){
    var provider = new firebase.auth.FacebookAuthProvider();

 firebase.auth().signInWithPopup(provider).then(function(result) {

    $log.log("Authenticated successfully with payload:", angular.toJson(result));
    $state.go('home');
  
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  $log.error("error:", angular.toJson(error));
});
  ;
  };
  */
  
/* SEEMS NOT WORKING WELL
  $scope.loginWithTwitter =  function(){
    var provider = new firebase.auth.FacebookAuthProvider();

 firebase.auth().signInWithPopup(provider).then(function(result) {

    $log.log("Authenticated successfully with payload:", angular.toJson(result));
    $state.go('home');
  
  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  $log.error("error:", angular.toJson(error));
});
  ;
  };
*/

// });
