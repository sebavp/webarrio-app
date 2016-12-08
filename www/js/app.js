'use strict';

angular.module('WeBarrio', [
  'ionic',
  'WeBarrio.routes',
  'WeBarrio.controllers',
  'WeBarrio.directives',
  'WeBarrio.utils',
  'WeBarrio.services.auth',
  'WeBarrio.services.agenda',
  'WeBarrio.services',
  'WeBarrio.config',
  'ngStorage',
  'ngCordova',
  'firebase',
  'pdf'
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
})
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.transition('ios');
  $ionicConfigProvider.tabs.style('standard').position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center').positionPrimaryButtons('left');
})
;


angular.module('WeBarrio.controllers', []);