var webarrio = angular.module('webarrio', ['ionic', 'ui.router']);

webarrio.run(["$ionicPlatform", function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.StatusBar) {
            StatusBar.hide();
        }
    });
}])

webarrio.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'home.html',
    controller: 'HomeCtrl',
    controllerAs: 'home'
  });

  $urlRouterProvider.otherwise("/");

}])

  .controller('HomeCtrl',[ "$state", function($state) {
    var vm = this;
  }]);
