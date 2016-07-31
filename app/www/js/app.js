'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })
    .state('home', {
      url: '/home',
      templateUrl: 'views/home/home.html',
      controller:'homeController'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'views/profile/profile.html',
      controller:'profileController'
    });
  $urlRouterProvider.otherwise("/login");
})

.constant('FURL', {
    apiKey: "AIzaSyCK2M3JsJ0bCpooHJZ78bTkkA2Qix-qio0",
    authDomain: "webarrio-6ffa7.firebaseapp.com",
    databaseURL: "https://webarrio-6ffa7.firebaseio.com",
    storageBucket: "webarrio-6ffa7.appspot.com",
  }
)
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function(FURL) {
    if(window.AdMob) {
        var admobid;

        if (device.platform == "Android") {
          admobid = { // for Android
            banner: 'ca-app-pub-8943241156434100/4304279677',
            interstitial: 'ca-app-pub-8943241156434100/3994725276'
          };
        } else {
          admobid = { // for iOS
            banner: 'ca-app-pub-8943241156434100/7257746078',
            interstitial: 'ca-app-pub-8943241156434100/2378391279'
          };
        }
        console.log("admobid" + angular.toJson(admobid));

        $adMob.createBanner( {
          adId: admobid.banner,
          autoShow: true,
          bgColor: 'black',
          position: $adMob.position.BOTTOM_CENTER
        });

        $adMob.prepareInterstitial({
          adId: admobid.interstitial,
          autoShow: false
        });
    }
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
