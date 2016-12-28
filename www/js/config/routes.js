angular.module('WeBarrio.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    // LOGIN
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login/login.html',
      controller:'loginController'
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'templates/login/forgot.html',
      controller:'loginController'
    })

    // REGISTER
    .state('register', {
      url: '/register',
      templateUrl: 'templates/register/register.html',
      controller:'registerController'
    })

    // HOME-TABS
    .state('tabs', {
      url: '/menu',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // HOME
    .state('tabs.home', {
      url: '/home/',
      views: {
        'tab_home': {
          templateUrl: 'templates/home/home.html',
          controller: 'homeController'
        }
      }
    })

    // DASHBOARD
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
    .state('dashboard-detail', {
      url: '/menu/dashboard/detail',
      templateUrl: 'templates/dashboard/detail.html',
      controller:'detailController'
    })
    .state('dashboard-instalaciones', {
      url: '/menu/dashboard/instalaciones',
      templateUrl: 'templates/dashboard/instalaciones.html',
      controller:'instalacionesController'
    })
    .state('dashboard-instalaciones-detail', {
      url: '/menu/dashboard/instalaciones-detail',
      templateUrl: 'templates/dashboard/instalaciones-detail.html',
      controller:'instalacionesDetailController'
    })
    .state('dashboard-asambleas', {
      url: '/menu/dashboard/asambleas',
      templateUrl: 'templates/dashboard/asambleas.html',
      controller:'asambleasController'
    })
    .state('dashboard-asambleas-detail', {
      url: '/menu/dashboard/asambleas-detail',
      templateUrl: 'templates/dashboard/asambleas-detail.html',
      controller:'asambleasDetailController'
    })
    .state('dashboard-mantenciones', {
      url: '/menu/dashboard/mantenciones',
      templateUrl: 'templates/dashboard/mantenciones.html',
      controller:'mantencionesController'
    })
    .state('dashboard-mantenciones-detail', {
      url: '/menu/dashboard/mantenciones-detail',
      templateUrl: 'templates/dashboard/mantenciones-detail.html',
      controller:'mantencionesDetailController'
    })
    .state('dashboard-longtext', {
      url: '/menu/dashboard/longtext',
      templateUrl: 'templates/dashboard/longtext.html',
      controller:'longtextController'
    })
    // reglamento
    .state('dashboard-reglamento', {
      url: '/menu/dashboard/reglamento',
      templateUrl: 'templates/dashboard/reglamento.html',
      controller:'dashboardController'
    })
    // AGENDA
    .state('tabs.agenda', {
      url: '/agenda/',
      views: {
        'tab_home': {
          templateUrl: 'templates/agenda/agenda.html',
          controller: 'agendaController'
        }
      }
    })
    .state('agenda-detail', {
      url: '/menu/agenda/:profesion/:person_id',
      templateUrl: 'templates/agenda/agenda_detail.html',
      controller:'agendaController'
    })
    .state('agenda-new', {
      url: '/menu/agenda/nuevo',
      templateUrl: 'templates/agenda/agenda_new.html',
      controller:'agendaController'
    })

    // CHAT
    .state('tabs.chat', {
      url: '/chat/',
      views: {
        'tab_chat': {
          templateUrl: 'templates/chat/chat.html',
          controller: 'chatController'
        }
      }
    })
    .state('chat-conversation', {
      url: '/chat/conversation/:personId/:chatId',
      templateUrl: 'templates/chat/conversation.html',
      controller:'chatController'
    })
    .state('new_message', {
      url: '/menu/dashboard/nuevo_mensaje',
      templateUrl: 'templates/chat/new_message.html',
      controller:'chatController'
    })

    // FEED (NOTIFICACIONES)
    .state('tabs.feed', {
      url: '/feed/',
      views: {
        'tab_feed': {
          templateUrl: 'templates/feed/feed.html',
          controller: 'homeController'
        }
      }
    })

    // ALERTA SOS
    .state('tabs.alerta', {
      url: '/alerta/',
      views: {
        'tab_alerta': {
          templateUrl: 'templates/alerta/alerta.html',
          controller: 'alertaController'
        }
      }
    })

    // COMUNIDAD
    .state('tabs.comunidad', {
      url: '/comunidad/',
      views: {
        'tab_home': {
          templateUrl: 'templates/comunidad/comunidad.html',
          controller: 'comunidadController'
        }
      }
    })
    .state('comunidad-anuncios', {
      url: '/comunidad/anuncios/',
      templateUrl: 'templates/comunidad/anuncios.html',
      controller:'anunciosController'
    })
    .state('comunidad-anuncios-detail', {
      url: '/comunidad/anuncios-detail/',
      templateUrl: 'templates/comunidad/anuncios-detail.html',
      controller:'anunciosDetailController'
    })
    .state('comunidad-eventos', {
      url: '/comunidad/eventos/',
      templateUrl: 'templates/comunidad/eventos.html',
      controller:'eventosController'
    })
    .state('comunidad-eventos-detail', {
      url: '/comunidad/eventos-detail/',
      templateUrl: 'templates/comunidad/eventos-detail.html',
      controller:'eventosDetailController'
    })

    // VISTAS SIDEMENU
    // PERFIL
    .state('profile', {
      url: '/profile',
      templateUrl: 'templates/sidemenu/profile.html',
      controller:'sideMenuController'
    })
    // AYUDA
    .state('help', {
      url: '/help',
      templateUrl: 'templates/sidemenu/help.html',
      controller:'sideMenuController'
    })

    // CONFIGURACION
    .state('config', {
      url: '/config',
      templateUrl: 'templates/sidemenu/config.html',
      controller:'dashboardController'
    })
    ;
  $urlRouterProvider.otherwise("/login");
});
