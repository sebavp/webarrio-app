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
				dateFormat: "=?",
				fromDate: "=?",
				toDate: "=?"
			},
			templateUrl: 'templates/directives/datepicker.html',
			link: function(scope, element) {
			    var today = new Date();
			    var twoWeeks = new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000));
			    
			    scope.dateFormat = scope.dateFormat || "dd/MM";

			    element.bind('click', function(){
					ionicDatePicker.openDatePicker({
						callback: function(val) {
							scope.eventDate = new Date(val);
							$compile(element.contents())(scope);
						},
						from: scope.fromDate || today,
						to: scope.toDate || twoWeeks,
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
.directive('ngThumb', ['$window', function($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function(item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function(file) {
            var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas class="image-preview"/>',
        scope: {
        	ngThumb: "=",
        	width: "=?",
        	height: "=?",
        },
        link: function(scope, element) {
            if (!helper.support) return;
			var canvas;
            scope.$watch(function(){ return scope.ngThumb; }, function(newV){
            	if (newV) {
            		init(newV);
            	}
            });

            function init(file){
	            if (!helper.isFile(file)) return;
	            if (!helper.isImage(file)) return;
	            canvas = element.find('canvas');
	            var reader = new FileReader();
	            reader.onload = onLoadFile;
	            reader.readAsDataURL(file);
            }

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = scope.width || this.width / this.height * scope.height;
                var height = scope.height || this.height / this.width * scope.width;
                canvas.attr({ width: width, height: height });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
 }])
;