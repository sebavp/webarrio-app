angular.module('WeBarrio.utils', []).factory('Utils', function($ionicLoading,$ionicPopup) {

	var Utils = {

    show: function() {
      $ionicLoading.show({
  	    animation: 'fade-in',
  	    showBackdrop: false,
  	    maxWidth: 200,
  	    showDelay: 500,
        template: 'Cargando...'
      });
    },

    hide: function(){
      $ionicLoading.hide();
    },

	alertshow: function(tit,msg){
		var alertPopup = $ionicPopup.alert({
			title: tit,
			template: msg
		});
		alertPopup.then(function(res) {
			//console.log('Registrado correctamente.');
		});
	},

	errMessage: function(errMsg) {
		Utils.alertshow("Error", errMsg ? errMsg : "Ups, Ha ocurrido un error...");
	},


  };

	return Utils;

});
