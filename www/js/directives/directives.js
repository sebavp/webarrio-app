angular.module('WeBarrio.directives', [])
.directive("mainSidebar", [
	"$ionicModal", "$rootScope", "$state", function($ionicModal, $rootScope, $state) {
		return {
			restrict: 'A',
			// templateUrl: 'templates/directives/dropdown-modal.html',
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
				// scope.selectOption = function (option) {
				// 	modal.remove();
				// 	createModal();
				// 	//scope.onSelectOption(option, scope.optionType);
				// };
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