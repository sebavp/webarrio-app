angular.module('WeBarrio.directives', [])
.directive("mainSidebar", [
	"$ionicModal", "$rootScope", "$state", function($ionicModal, $rootScope, $state) {
		return {
			restrict: 'A',
			link: function(scope, element) {
				var modal;
				var createModal = function () {
					$ionicModal.fromTemplateUrl('templates/dashboard/sidebar.html', {
						scope: scope,
						animation: 'none'
					}).then(function(modalInstance) {
						modal = modalInstance;
						$rootScope.modalType = "sidebar-modal";
					});
					
				};
				createModal();

				scope.logOut = function () {
					modal.hide();
					$state.go('login');
				};
				scope.goToProfile = function (){
					modal.hide();
					$state.go('profile');	
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
]);