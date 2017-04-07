(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('homeController', homeController);

    function homeController($scope, $state, $ionicSlideBoxDelegate, $localStorage, $timeout, Auth, $ionicPush) {
      var currentUser = $localStorage.currentUser;

      $scope.$on('$ionicView.beforeEnter', function(){
        currentUser = $localStorage.currentUser;
        $scope.allCondos = currentUser.condos;
        $scope.currentCondo = _.first(currentUser.condos);
        $scope.allDeptos = $scope.currentCondo.departments;
        $ionicSlideBoxDelegate.$getByHandle('condoslider').update();
        $ionicSlideBoxDelegate.$getByHandle('deptoslider').update();
        console.log("isWebView", ionic.Platform.isWebView())
        if (ionic.Platform.isWebView() && $localStorage.dvNotifications !== true) {
          alert("register!!!")
          $ionicPush.register().then(function(t) {
            console.log("registered")
            
              Auth.setDevice(currentUser.user.id, t).then(function(){
                $localStorage.dvNotifications = true;
                alert("register success")
                return $ionicPush.saveToken(t, {ignore_user: true});
              }).then( function( response) {
                console.log(response)
                alert("register success ionic")
              });
          }, function (error) {
            alert("register error")
            console.log(error)
          });
          
        }

          // if ('serviceWorker' in navigator && $localStorage.dvNotifications !== true) {
          //       navigator.serviceWorker.register('/sw.js').then(function(registration) {
          //         registration.pushManager.subscribe({
          //           userVisibleOnly: true
          //         }).then(function(s) {
          //             var data = {
          //               user_agent: navigator.userAgent,
          //               endpoint: s.endpoint,
          //               p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(s.getKey('p256dh')))).replace(/\+/g, '-').replace(/\//g, '_'),
          //               auth: btoa(String.fromCharCode.apply(null, new Uint8Array(s.getKey('auth')))).replace(/\+/g, '-').replace(/\//g, '_')
          //             };
          //             Auth.setDevice(currentUser.user.id, data).then(function(){
          //               $localStorage.dvNotifications = true;
          //             });
          //         }).catch(function(e) {
          //           console.log(e);
          //         });
          //       }).catch(function(err) {
          //         // registration failed :(
          //         console.log('ServiceWorker registration failed: ', err);
          //       });
          //     }
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