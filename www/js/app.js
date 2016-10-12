'use strict';

angular.module('WeBarrio', [
  'ionic',
  'WeBarrio.routes',
  'WeBarrio.controllers',
  'WeBarrio.directives',
  'WeBarrio.utils',
  'WeBarrio.services.auth',
  'WeBarrio.services',
  'WeBarrio.config',
  'ngStorage',
  'ngCordova',
  'firebase'
  ])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function(FURL) {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


angular.module('WeBarrio.controllers', []);