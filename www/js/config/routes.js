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
    // .state('register', {
    //   url: '/register',
    //   templateUrl: 'templates/register/register.html',
    //   controller:'registerController'
    // })

    //TyC
    .state('tyc', {
      url: '/tyc',
      templateUrl: 'templates/tyc/tyc.html'
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
    .state('tabs.dashboard-gastos-comunes', {
      url: '/dashboard/gastos-comunes',
      views:{
        'tab_dashboard': {
            templateUrl: 'templates/dashboard/gastos-comunes.html',
            controller:'gastosComunesController'
        }
      }
    })
    .state('tabs.dashboard-gastos-comunes-admin', {
      url: '/dashboard/gastos-comunes-admin',
      views:{
        'tab_dashboard': {
            templateUrl: 'templates/dashboard/gastos-comunes-admin.html',
            controller:'gastosComunesController'
        }
      }
    })
    .state('dashboard-gastos-comunes-detail', {
      url: '/menu/dashboard/gastos-comunes-detail/:year/:month',
      templateUrl: 'templates/dashboard/gastos-comunes-detail.html',
      controller:'gastosComunesController'
    })
    .state('dashboard-gastos-comunes-new', {
      url: '/menu/dashboard/gastos-comunes-new',
      templateUrl: 'templates/dashboard/gastos-comunes-new.html',
      controller:'gastosComunesController'
    })
    .state('tabs.dashboard-pagos', {
      url: '/dashboard/pagos',
      views: {
        'tab_dashboard': {
          templateUrl: 'templates/dashboard/pagos.html',
          controller:'pagosController'
        }
      }
    })
    .state('dashboard-pagos-detail', {
      url: '/menu/dashboard/pagos-detail/:deptoId',
      templateUrl: 'templates/dashboard/pagos-detail.html',
      controller:'pagosController'
    })
    .state('dashboard-pagos-new', {
      url: '/menu/dashboard/pagos-new',
      templateUrl: 'templates/dashboard/pagos-new.html',
      controller:'pagosController'
    })
    .state('tabs.dashboard-instalaciones', {
      url: '/dashboard/instalaciones',
      views: {
        'tab_dashboard': {
            templateUrl: 'templates/dashboard/instalaciones.html',
            controller:'instalacionesController'
        }
      }
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
    .state('tabs.dashboard-asambleas', {
      url: '/dashboard/asambleas',
      views: {
        'tab_dashboard': {
            templateUrl: 'templates/dashboard/asambleas.html',
            controller:'asambleasController'
        }
      }
    })
    .state('dashboard-asambleas-detail', {
      url: '/menu/dashboard/asambleas-detail/:event_id',
      templateUrl: 'templates/dashboard/asambleas-detail.html',
      controller:'asambleasController'
    })
    .state('dashboard-asambleas-new', {
      url: '/menu/dashboard/asambleas-new',
      templateUrl: 'templates/dashboard/asambleas-new.html',
      controller:'asambleasController'
    })
    .state('tabs.dashboard-avisos', {
      url: '/dashboard/avisos',
      views: {
        'tab_dashboard': {
            templateUrl: 'templates/dashboard/avisos.html',
            controller:'avisosController'
        }
      }
    })
    .state('dashboard-avisos-detail', {
      url: '/menu/dashboard/avisos-detail/:event_id',
      templateUrl: 'templates/dashboard/avisos-detail.html',
      controller:'avisosController'
    })
    .state('dashboard-avisos-new', {
      url: '/menu/dashboard/avisos-new',
      templateUrl: 'templates/dashboard/avisos-new.html',
      controller:'avisosController'
    })
    .state('tabs.dashboard-mantenciones', {
      url: '/dashboard/mantenciones',
      views: {
        'tab_dashboard': {
            templateUrl: 'templates/dashboard/mantenciones.html',
            controller:'mantencionesController'
        }
      }
    })
    .state('dashboard-mantenciones-detail', {
      url: '/menu/dashboard/mantenciones-detail/:event_id',
      templateUrl: 'templates/dashboard/mantenciones-detail.html',
      controller:'mantencionesController'
    })
    .state('dashboard-mantenciones-new', {
      url: '/menu/dashboard/mantenciones-new',
      templateUrl: 'templates/dashboard/mantenciones-new.html',
      controller:'mantencionesController'
    })
    .state('tabs.dashboard-admin-home-add-user', {
      url: '/dashboard/admin-home/add-user',
      views: {
        'tab_dashboard': {
          templateUrl: 'templates/dashboard/add-user.html',
          controller: 'addUserController'
        }
      }
    })
    .state('tabs.dashboard-admin-home', {
      url: '/dashboard/admin-home',
      views: {
        'tab_dashboard': {
          templateUrl: 'templates/dashboard/admin-home.html',
          controller: 'adminHomeController'
        }
      }
    })
    // reglamento
    .state('tabs.dashboard-reglamento', {
      url: '/dashboard/reglamento',
      views: {
        'tab_dashboard': {
            templateUrl: 'templates/dashboard/reglamento.html',
            controller:'dashboardController'
        }
      }
    })
    // reglamento
    .state('tabs.dashboard-alerta', {
      url: '/dashboard/alerta',
      views: {
        'tab_dashboard': {
            templateUrl: 'templates/dashboard/alerta-admin.html',
            controller:'alertaController'
        }
      }
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
    .state('agenda-new', {
      url: '/menu/agenda/nuevo',
      templateUrl: 'templates/agenda/agenda_new.html',
      controller:'agendaController'
    })
    .state('agenda-detail', {
      url: '/menu/agenda/:contactId',
      templateUrl: 'templates/agenda/agenda_detail.html',
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
    .state('chat-group-conversation', {
      url: '/chat/group-conversation/:groupName/:chatId',
      templateUrl: 'templates/chat/group_conversation.html',
      controller:'chatController'
    })
    .state('chat-new-message', {
      url: '/menu/chat/nuevo_mensaje',
      templateUrl: 'templates/chat/new_message.html',
      controller:'chatController'
    })
    .state('chat-group', {
      url: '/menu/chat/grupo/:groupName/:chatId',
      templateUrl: 'templates/chat/group.html',
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
          controller: 'feedController'
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
    .state('tabs.comunidad-anuncios', {
      url: '/anuncios/',
      views:{
        'tab_home':{
          templateUrl: 'templates/comunidad/anuncios.html',
          controller:'anunciosController'
        }
      }
    })
    .state('comunidad-anuncios-detail', {
      url: '/comunidad/anuncios-detail/:announcement_id',
      templateUrl: 'templates/comunidad/anuncios-detail.html',
      controller:'anunciosController'
    })
    .state('comunidad-anuncios-new', {
      url: '/comunidad/anuncios-new/',
      templateUrl: 'templates/comunidad/anuncios-new.html',
      controller:'anunciosController'
    })
    .state('tabs.comunidad-eventos', {
      url: '/eventos/',
      views:{
        'tab_home':{
          templateUrl: 'templates/comunidad/eventos.html',
          controller:'eventosController'
        }
      }
    })
    .state('comunidad-eventos-detail', {
      url: '/comunidad/eventos-detail/:event_id',
      templateUrl: 'templates/comunidad/eventos-detail.html',
      controller:'eventosController'
    })
    .state('comunidad-eventos-new', {
      url: '/comunidad/eventos-new/',
      templateUrl: 'templates/comunidad/eventos-new.html',
      controller:'eventosController'
    })
    .state('tabs.comunidad-clasificados', {
      url: '/clasificados/',
      views:{
        'tab_home':{
          templateUrl: 'templates/comunidad/clasificados.html',
          controller:'clasificadosController'
        }
      }
    })
    .state('comunidad-clasificados-detail', {
      url: '/comunidad/clasificados-detail/:announcement_id',
      templateUrl: 'templates/comunidad/clasificados-detail.html',
      controller:'clasificadosController'
    })
    .state('comunidad-clasificados-new', {
      url: '/comunidad/clasificados-new/',
      templateUrl: 'templates/comunidad/clasificados-new.html',
      controller:'clasificadosController'
    })
    .state('tabs.comunidad-recomendaciones', {
      url: '/recomendaciones/',
      views:{
        'tab_home':{
          templateUrl: 'templates/comunidad/recomendaciones.html',
          controller:'recomendacionesController'
        }
      }
    })
    .state('comunidad-recomendaciones-detail', {
      url: '/comunidad/recomendaciones-detail/:announcement_id',
      templateUrl: 'templates/comunidad/recomendaciones-detail.html',
      controller:'recomendacionesController'
    })
    .state('comunidad-recomendaciones-new', {
      url: '/comunidad/recomendaciones-new/',
      templateUrl: 'templates/comunidad/recomendaciones-new.html',
      controller:'recomendacionesController'
    })
    .state('tabs.comunidad-mascotas', {
      url: '/mascotas/',
      views:{
        'tab_home':{
          templateUrl: 'templates/comunidad/mascotas.html',
          controller:'mascotasController'
        }
      }
    })
    .state('comunidad-mascotas-detail', {
      url: '/comunidad/mascotas-detail/:announcement_id',
      templateUrl: 'templates/comunidad/mascotas-detail.html',
      controller:'mascotasController'
    })
    .state('comunidad-mascotas-new', {
      url: '/comunidad/mascotas-new/',
      templateUrl: 'templates/comunidad/mascotas-new.html',
      controller:'mascotasController'
    })
    .state('tabs.comunidad-carp', {
      url: '/carp/',
      views:{
        'tab_home':{
          templateUrl: 'templates/comunidad/carp.html',
          controller:'carpController'
        }
      }
    })

    .state('comunidad-carp-detail', {
      url: '/comunidad/carp-detail/:event_id',
      templateUrl: 'templates/comunidad/carp-detail.html',
      controller:'carpController'
    })
    .state('comunidad-carp-new', {
      url: '/comunidad/carp-new/',
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
    .state('public_profile', {
      url: '/public_profile/:personId/:deptoNumber/:chatId',
      templateUrl: 'templates/sidemenu/profile.html',
      controller:'sideMenuController'
    })
    .state('edit-profile', {
      url: '/profile/edit',
      templateUrl: 'templates/sidemenu/edit-profile.html',
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
