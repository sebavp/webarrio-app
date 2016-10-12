angular.module('WeBarrio.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'templates/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register/register.html',
      controller:'registerController'
    })

    .state('tabs', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    
    .state('tabs.home', {
      url: '/home/',
      views: {
        'tab_home': {
          templateUrl: 'templates/home/home.html',
          controller: 'homeController'
        }
      }
    })

    .state('tabs.dashboard', {
      url: '/dashboard/',
      views: {
        'tab_dashboard': {
          templateUrl: 'templates/dashboard/dashboard.html',
          controller: 'dashboardController'
        }
      }
    })

    .state('dashboard-account', {
      url: '/menu/dashboard/mi-cuenta',
      templateUrl: 'templates/dashboard/account.html',
      controller:'accountController'
    })

    .state('tabs.chat', {
      url: '/chat/',
      views: {
        'tab_chat': {
          templateUrl: 'templates/chat/chat.html',
          controller: 'chatController'
        }
      }
    })

    .state('tabs.feed', {
      url: '/feed/',
      views: {
        'tab_feed': {
          templateUrl: 'templates/feed/feed.html',
          controller: 'homeController'
        }
      }
    })
  
    .state('tabs.alerta', {
      url: '/alerta/',
      views: {
        'tab_alerta': {
          templateUrl: 'templates/alerta/alerta.html',
          controller: 'alertaController'
        }
      }
    })
  

    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/profile/profile.html',
      controller:'profileController'
    });
  $urlRouterProvider.otherwise("/login");
});
