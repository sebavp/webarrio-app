angular.module('WeBarrio.routes', [])
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

    .state('tabs', {
      url: '/menu',
      abstract: true,
      templateUrl: 'views/tabs.html'
    })
    
    .state('tabs.home', {
      url: '/home/',
      views: {
        'tab_home': {
          templateUrl: 'views/home/home.html',
          controller: 'homeController'
        }
      }
    })

    .state('tabs.dashboard', {
      url: '/dashboard/',
      views: {
        'tab_dashboard': {
          templateUrl: 'views/dashboard/dashboard.html',
          controller: 'dashboardController'
        }
      }
    })

    .state('dashboard-account', {
      url: '/menu/dashboard/mi-cuenta',
      templateUrl: 'views/dashboard/account.html',
      controller:'accountController'
    })

    .state('tabs.chat', {
      url: '/chat/',
      views: {
        'tab_chat': {
          templateUrl: 'views/chat/chat.html',
          controller: 'chatController'
        }
      }
    })

    .state('tabs.feed', {
      url: '/feed/',
      views: {
        'tab_feed': {
          templateUrl: 'views/feed/feed.html',
          controller: 'homeController'
        }
      }
    })
  
    .state('tabs.alerta', {
      url: '/alerta/',
      views: {
        'tab_alerta': {
          templateUrl: 'views/alerta/alerta.html',
          controller: 'alertaController'
        }
      }
    })
  

    .state('profile', {
      url: '/profile',
      templateUrl: 'views/profile/profile.html',
      controller:'profileController'
    });
  $urlRouterProvider.otherwise("/login");
});
