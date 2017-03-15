(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('homeController', homeController);

    function homeController($scope, $state, $ionicSlideBoxDelegate, $localStorage, $timeout, Auth, $ionicPopup) {
      var currentUser = $localStorage.currentUser;

      var openMessageModal = function(aviso) {
        var av = aviso || {};
          var alertPopup = $ionicPopup.alert({
           cssClass: "avisoAlert",
           title: av.title || "Aviso",
           template: av.details || "Este es un Aviso",
           okText: "X"
         });

         alertPopup.then(function() {
            Auth.updateNotification($scope.currentAviso.id).then(function(response){
              console.log(response);
            });
         });
      };


      var loadAvisos = function (){
        Auth.getAvisos(currentUser.user.id, $scope.currentCondo.id).then(function(response){
          console.log(response.data.avisos);
          if (response.data.avisos.length > 0) {
            openMessageModal(_.first(response.data.avisos));
          }
        });
      };

      $scope.$on('$ionicView.beforeEnter', function(){
        currentUser = $localStorage.currentUser;
        $scope.allCondos = currentUser.condos;
        $scope.currentCondo = _.first(currentUser.condos);
        $scope.allDeptos = $scope.currentCondo.departments;
        $ionicSlideBoxDelegate.$getByHandle('condoslider').update();
        $ionicSlideBoxDelegate.$getByHandle('deptoslider').update();

        loadAvisos();

          if ('serviceWorker' in navigator && $localStorage.dvNotifications !== true) {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                  registration.pushManager.subscribe({
                    userVisibleOnly: true
                  }).then(function(s) {
                      var data = {
                        user_agent: navigator.userAgent,
                        endpoint: s.endpoint,
                        p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(s.getKey('p256dh')))).replace(/\+/g, '-').replace(/\//g, '_'),
                        auth: btoa(String.fromCharCode.apply(null, new Uint8Array(s.getKey('auth')))).replace(/\+/g, '-').replace(/\//g, '_')
                      };
                      Auth.setDevice(currentUser.user.id, data).then(function(){
                        $localStorage.dvNotifications = true;
                      });
                  }).catch(function(e) {
                    console.log(e);
                  });
                }).catch(function(err) {
                  // registration failed :(
                  console.log('ServiceWorker registration failed: ', err);
                });
              }
      });

      $scope.changeCurrentCondo = function(index){
        $scope.currentCondo = $scope.allCondos[index];
        $scope.allDeptos = $scope.currentCondo.departments;
        $localStorage.currentCondo = $scope.allCondos[index];
        var allCondos = angular.copy(currentUser.condos);
        allCondos = _.without(allCondos, _.findWhere(allCondos, {id: $scope.currentCondo.id}));
        allCondos.unshift(angular.copy($scope.currentCondo));
        $localStorage.currentUser.condos = allCondos;
        $localStorage.currentDepto = _.first($scope.currentCondo.departments);
        $timeout(function() {
          $ionicSlideBoxDelegate.$getByHandle('deptoslider').update();
        }, 50);
      };

      $scope.changeCurrentDepto = function(index){
        $scope.currentDepto = $scope.currentCondo.departments[index];
        $localStorage.currentDepto = $scope.currentCondo.departments[index];
        var allDeptos = angular.copy($scope.currentCondo.departments);
        allDeptos = _.without(allDeptos, _.findWhere(allDeptos, {id: $scope.currentDepto.id}));
        allDeptos.unshift(angular.copy($scope.currentDepto));
        _.first($localStorage.currentUser.condos).departments = allDeptos;
      };
    }

}).call(this);