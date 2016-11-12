(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('agendaController', agendaController);

    function agendaController($scope, $state, $ionicHistory, $stateParams, $filter, agendaService, $localStorage) {
        
        console.info("agendaController init");
        

        $scope.searchInAgenda = function (text){
            if (text && text.length > 2) {
                $scope.searching = true;
                var searchedProfesions = [];
                angular.forEach($scope.profesiones, function(profesion){
                    if ($filter('filter')(profesion.contacts, {name: text}).length > 0) {
                        profesion.open = true;
                        searchedProfesions.push(profesion)
                    };
                })
                $scope.profesiones = angular.copy(searchedProfesions);
            } else {
                $scope.searching = false;
                $scope.profesiones = angular.copy(allProfesiones);
            }
        
        }

        $scope.selectProfesion = function (profesion){
        	$scope.profesionSeleccionada = profesion.id;
            if (profesion.open == true) {
                profesion.open = false;
            };
        };

        $scope.goToDetail = function(profesion, persona){
        	$state.go('agenda-detail', {profesion: profesion.name, person_id: persona.id});
        };

        $scope.nuevoRegistro = function(){
            $state.go('agenda-new');
        };

        var loadProfesions = function(condoId){
            agendaService.getAllProfesions(condoId).then(function(response){
                $scope.profesiones = response.contacts;
                if ($state.current.name === "agenda-detail") {
                    $scope.currentProfesion = _.findWhere($scope.profesiones, {name: $stateParams.profesion});
                    $scope.currentPerson = _.findWhere($scope.currentProfesion.contacts, {id: parseInt($stateParams.person_id)});
                }
            });
        };

        $scope.newContact = function(newRecord){
            console.log(newRecord)
            // TODO: Validar Formulario
            agendaService.saveNewContact().then(function(response){
                console.log(response)
            });
        }

        $scope.$on("$ionicView.beforeEnter", function (){
            var currentCondo = $localStorage.currentCondo;
            loadProfesions(currentCondo.id);
            $scope.newRecord = {};
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