angular.module('WeBarrio.directives', [])
.directive("mainSidebar", [
	"$ionicModal", "$rootScope", "$state", "$localStorage", function($ionicModal, $rootScope, $state, $localStorage) {
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
					$localStorage.$reset();
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
.directive("datepicker", [
	"ionicDatePicker", '$compile', function(ionicDatePicker, $compile) {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				eventDate: "=",
			},
			templateUrl: 'templates/directives/datepicker.html',
			link: function(scope, element) {
			    var today = new Date();
			    var twoWeeks = new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000));

			    element.bind('click', function(){
					ionicDatePicker.openDatePicker({
						callback: function(val) {
							scope.eventDate = new Date(val);
							$compile(element.contents())(scope);

						},
						from: today,
						to: twoWeeks,
						mondayFirst: true,
						closeOnSelect: true,
						templateType: 'popup'
					});
			    });

			}
		};
	}
])

.directive("timepicker", [
	"ionicTimePicker", '$compile', function(ionicTimePicker, $compile) {
		return {
			restrict: 'E',
			transclude: true,
			scope: {
				selectedTime: "=",
				placeholder: "="
			},
			templateUrl: 'templates/directives/timepicker.html',
			link: function(scope, element) {
			    element.bind('click', function(){
			      ionicTimePicker.openTimePicker({
			        callback: function (val) {
			          	scope.selectedTime = (new Date(((val + (180*60)) * 1000) )).toISOString();
			          	$compile(element.contents())(scope);
			        },
			      });
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