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
  'WeBarrio.services.announcements',
  'WeBarrio.services',
  'WeBarrio.config',
  'WeBarrio.filters',
  'ngStorage',
  'ngCordova',
  'firebase',
  'pdf',
  'ionic-datepicker',
  'ionic-timepicker',
  'angularFileUpload',
  'angular-web-notification'
  ])
.run(function($ionicPlatform, Auth, $state, $rootScope, $timeout, mensajeService) {

  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.name !== 'tyc' && toState.name !== 'forgot') {
      if (Auth.isSession() == false){
        $timeout(function() {
          $state.go('login');
        });
      } else {
        mensajeService.startNotiticationListener();
      }
    }
  });

  $ionicPlatform.ready(function(FURL) {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($ionicConfigProvider, ionicDatePickerProvider, ionicTimePickerProvider) {
  $ionicConfigProvider.views.transition('ios');
  $ionicConfigProvider.tabs.style('standard').position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center').positionPrimaryButtons('left');
  ionicDatePickerProvider.configDatePicker({
    inputDate: new Date(),
    titleLabel: 'Seleccione Fecha',
    setLabel: 'Elegir',
    todayLabel: 'Hoy',
    closeLabel: 'Cancelar',
    mondayFirst: false,
    weeksList: ["D", "L", "M", "M", "J", "V", "S"],
    monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"],
    templateType: 'popup',
    from: new Date(1960, 1, 1),
    to: new Date(),
    showTodayButton: false,
    dateFormat: 'dd/MMMM/yyyy',
    closeOnSelect: true,
    disableWeekdays: []
  });

  ionicTimePickerProvider.configTimePicker({
    inputTime: (((new Date()).getHours() + 1) * 60 * 60),
    format: 24,
    step: 15,
    setLabel: 'Elegir',
    closeLabel: 'Cancelar'
  });


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

