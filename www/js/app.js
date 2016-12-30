'use strict';

angular.module('WeBarrio', [
  'ionic',
  'WeBarrio.routes',
  'WeBarrio.controllers',
  'WeBarrio.directives',
  'WeBarrio.utils',
  'WeBarrio.services.auth',
  'WeBarrio.services.agenda',
  'WeBarrio.services.mensajes',
  'WeBarrio.services.events',
  'WeBarrio.services',
  'WeBarrio.config',
  'WeBarrio.filters',
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

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCK2M3JsJ0bCpooHJZ78bTkkA2Qix-qio0",
    authDomain: "webarrio-6ffa7.firebaseapp.com",
    databaseURL: "https://webarrio-6ffa7.firebaseio.com",
    storageBucket: "webarrio-6ffa7.appspot.com",
    messagingSenderId: "94113503596"
  };
  
  firebase.initializeApp(config);
  
})
;


angular.module('WeBarrio.controllers', []);