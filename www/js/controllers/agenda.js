(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('agendaController', agendaController);

    function agendaController($scope, $state, $ionicHistory) {
        
        console.info("agendaController init");

        $scope.profesiones = [
        	{	
        		id: 1, 
        		name: "BabySitter", 
        		personas:[
        			{name: "Lucila Ortega"},
        			{name: "Vanesa Faerna"},
        			{name: "Virginia Mamani"}
        		]
        	},
        	{	
        		id: 2, 
        		name: "Maestro", 
        		personas:[
        			{name: "Joaquin Castro"},
        			{name: "Pedro Fernández"}
        		]
        	},
        	{	
        		id: 3, 
        		name: "Jardinero", 
        		personas:[
        			{name: "Pablo Ulloa"},
        			{name: "Fermin Caceres"},
        			{name: "Gabriel Moya"},
        			{name: "José Fierro"},
        		]
        	},
        ];

        $scope.selectProfesion = function (profesion){
        	$scope.profesionSeleccionada = profesion.id;
        }

        $scope.goBack = function (){
        	if (_.isNull($ionicHistory.viewHistory().backView)) {
        		$state.go("tabs.home")
        	} else{
        		$ionicHistory.goBack();	
        	} 
        };
        
    }




}).call(this);