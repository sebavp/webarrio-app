angular.module('WeBarrio.directives', [])
.directive("mainSidebar", [
	"$ionicModal", "$rootScope", "$state", function($ionicModal, $rootScope, $state) {
		return {
			restrict: 'A',
			link: function(scope, element) {
				var modal;
				var createModal = function () {
					$ionicModal.fromTemplateUrl('templates/sidemenu/sidebar.html', {
						scope: scope,
						animation: 'none'
					}).then(function(modalInstance) {
						modal = modalInstance;
						$rootScope.modalType = "sidebar-modal";
					});
					
				};
				createModal();

				scope.logOut = function () {
					//TODO: CLEAR LOCALSTORAGE
					modal.hide();
					$state.go('login');
				};
				scope.goTo = function (target){
					modal.hide();
					$state.go(target);	
				};
				return element.bind('click', function() {
					if (modal.isShown()) {
						modal.hide();	
					} else{
						modal.show();	
					}
					
				});

			}
		};
	}
])
.directive('errSrc', function() {
  return {
	link: function(scope, element, attrs) {
	  element.bind('error', function() {
		if (attrs.src !== attrs.errSrc) {
		  attrs.$set('src', attrs.errSrc);
		}
	  });
	}
  };
})
;