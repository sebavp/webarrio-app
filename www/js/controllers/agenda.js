(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('agendaController', agendaController);

    function agendaController($scope, $state, $ionicHistory, $stateParams) {
        
        console.info("agendaController init");

        $scope.profesiones = [
        	{	
        		id: 1, 
        		name: "BabySitter", 
        		personas:[
        			{id: 1, name: "Lucila Ortega", text: "Part time disponible \nReferencias y experiencia", phone: "+5691234123"},
        			{id: 2, name: "Vanesa Faerna"},
        			{id: 3, name: "Virginia Mamani"}
        		]
        	},
        	{	
        		id: 2, 
        		name: "Maestro", 
        		personas:[
        			{id: 4, name: "Joaquin Castro"},
        			{id: 5, name: "Pedro Fernández"}
        		]
        	},
        	{	
        		id: 3, 
        		name: "Jardinero", 
        		personas:[
        			{id: 6, name: "Pablo Ulloa"},
        			{id: 7, name: "Fermin Caceres"},
        			{id: 8, name: "Gabriel Moya"},
        			{id: 9, name: "José Fierro"},
        		]
        	},
        ];

        $scope.selectProfesion = function (profesion){
        	$scope.profesionSeleccionada = profesion.id;
        };

        $scope.goToDetail = function(profesion, persona){
        	$state.go('agenda-detail', {profesion: profesion.name, person_id: persona.id});
        }

        $scope.$on("$ionicView.beforeEnter", function (){
        	if ($state.current.name === "agenda-detail") {
        		$scope.currentProfesion = _.findWhere($scope.profesiones, {name: $stateParams.profesion});
        		$scope.currentPerson = _.findWhere($scope.currentProfesion.personas, {id: parseInt($stateParams.person_id)});
        	}
        })

        $scope.goBack = function (){
        	if (_.isNull($ionicHistory.viewHistory().backView)) {
        		$state.go("tabs.home")
        	} else{
        		$ionicHistory.goBack();	
        	} 
        };
        
    }




}).call(this);