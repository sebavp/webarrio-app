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
      url: '/menu/dashboard/instalaciones-detail/:event_id',
      templateUrl: 'templates/dashboard/instalaciones-detail.html',
      controller:'instalacionesController'
    })
    .state('dashboard-instalaciones-new', {
      url: '/menu/dashboard/instalaciones-new',
      templateUrl: 'templates/dashboard/instalaciones-new.html',
      controller:'instalacionesController'
    })
    .state('dashboard-asambleas', {
      url: '/menu/dashboard/asambleas',
      templateUrl: 'templates/dashboard/asambleas.html',
      controller:'asambleasController'
    })
    .state('dashboard-asambleas-detail', {
      url: '/menu/dashboard/asambleas-detail/:event_id',
      templateUrl: 'templates/dashboard/asambleas-detail.html',
      controller:'asambleasController'
    })
    .state('dashboard-mantenciones', {
      url: '/menu/dashboard/mantenciones',
      templateUrl: 'templates/dashboard/mantenciones.html',
      controller:'mantencionesController'
    })
    .state('dashboard-mantenciones-detail', {
      url: '/menu/dashboard/mantenciones-detail/:event_id',
      templateUrl: 'templates/dashboard/mantenciones-detail.html',
      controller:'mantencionesController'
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
      url: '/menu/agenda/:contactId',
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
      url: '/chat/conversation/:personId/:deptoNumber/:chatId',
      templateUrl: 'templates/chat/conversation.html',
      controller:'chatController'
    })
    .state('chat-new-message', {
      url: '/menu/chat/nuevo_mensaje',
      templateUrl: 'templates/chat/new_message.html',
      controller:'chatController'
    })
    .state('chat-new-group', {
      url: '/menu/chat/nuevo_grupo',
      templateUrl: 'templates/chat/new_group.html',
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
      url: '/comunidad/anuncios-detail/:announcement_id',
      templateUrl: 'templates/comunidad/anuncios-detail.html',
      controller:'anunciosController'
    })
    .state('comunidad-anuncios-new', {
      url: '/comunidad/anuncios-new/:announcement_id',
      templateUrl: 'templates/comunidad/anuncios-new.html',
      controller:'anunciosController'
    })
    .state('comunidad-eventos', {
      url: '/comunidad/eventos/',
      templateUrl: 'templates/comunidad/eventos.html',
      controller:'eventosController'
    })
    .state('comunidad-eventos-detail', {
      url: '/comunidad/eventos-detail/:event_id',
      templateUrl: 'templates/comunidad/eventos-detail.html',
      controller:'eventosController'
    })
    .state('comunidad-eventos-new', {
      url: '/comunidad/eventos-new/:event_id',
      templateUrl: 'templates/comunidad/eventos-new.html',
      controller:'eventosController'
    })
    .state('comunidad-clasificados', {
      url: '/comunidad/clasificados/',
      templateUrl: 'templates/comunidad/clasificados.html',
      controller:'clasificadosController'
    })
    .state('comunidad-clasificados-detail', {
      url: '/comunidad/clasificados-detail/:announcement_id',
      templateUrl: 'templates/comunidad/clasificados-detail.html',
      controller:'clasificadosController'
    })
    .state('comunidad-clasificados-new', {
      url: '/comunidad/clasificados-new/:announcement_id',
      templateUrl: 'templates/comunidad/clasificados-new.html',
      controller:'clasificadosController'
    })
    .state('comunidad-recomendaciones', {
      url: '/comunidad/recomendaciones/',
      templateUrl: 'templates/comunidad/recomendaciones.html',
      controller:'recomendacionesController'
    })
    .state('comunidad-recomendaciones-detail', {
      url: '/comunidad/recomendaciones-detail/:announcement_id',
      templateUrl: 'templates/comunidad/recomendaciones-detail.html',
      controller:'recomendacionesController'
    })
    .state('comunidad-recomendaciones-new', {
      url: '/comunidad/recomendaciones-new/:announcement_id',
      templateUrl: 'templates/comunidad/recomendaciones-new.html',
      controller:'recomendacionesController'
    })
    .state('comunidad-mascotas', {
      url: '/comunidad/mascotas/',
      templateUrl: 'templates/comunidad/mascotas.html',
      controller:'mascotasController'
    })
    .state('comunidad-mascotas-detail', {
      url: '/comunidad/mascotas-detail/:announcement_id',
      templateUrl: 'templates/comunidad/mascotas-detail.html',
      controller:'mascotasController'
    })
    .state('comunidad-mascotas-new', {
      url: '/comunidad/mascotas-new/:announcement_id',
      templateUrl: 'templates/comunidad/mascotas-new.html',
      controller:'mascotasController'
    })
    .state('comunidad-carp', {
      url: '/comunidad/carp/',
      templateUrl: 'templates/comunidad/carp.html',
      controller:'carpController'
    })
    .state('comunidad-carp-detail', {
      url: '/comunidad/carp-detail/:event_id',
      templateUrl: 'templates/comunidad/carp-detail.html',
      controller:'carpController'
    })
    .state('comunidad-carp-new', {
      url: '/comunidad/carp-new/:event_id',
      templateUrl: 'templates/comunidad/carp-new.html',
      controller:'carpController'
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
