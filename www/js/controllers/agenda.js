(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('agendaController', agendaController);

    function agendaController($scope, $state, $ionicHistory, $stateParams, $filter, agendaService, $localStorage, $ionicModal) {
        
        var currentCondo = $localStorage.currentCondo;
        var currentUser = $localStorage.currentUser.user;
        var allProfesiones = [];
        
        $scope.searchInAgenda = function (text){
            if (text && text.length > 2) {
                $scope.searching = true;
                var searchedProfesions = [];
                angular.forEach($scope.profesiones, function(profesion){
                    if ($filter('filter')(profesion.contacts, {name: text}).length > 0) {
                        profesion.open = true;
                        searchedProfesions.push(profesion);
                    }
                });
                $scope.profesiones = angular.copy(searchedProfesions);
            } else {
                $scope.searching = false;
                $scope.profesiones = angular.copy(allProfesiones);
            }
        };

        $scope.selectProfesion = function (profesion){
        	$scope.profesionSeleccionada = profesion.id;
            if (profesion.open === true) {
                profesion.open = false;
            }
        };

        $scope.goToDetail = function(persona){
        	$state.go('agenda-detail', {contactId: persona.id});
        };

        $scope.nuevoRegistro = function(){
            $state.go('agenda-new');
        };

        var loadProfesions = function(condoId){
            agendaService.getAllProfesions(condoId).then(function(response){
                $scope.profesiones = response.contacts;
                allProfesiones = angular.copy(response.contacts);
            });
        };

        var loadContact = function(condoId, contactId){
            agendaService.loadContact(condoId, contactId).then(function(response){
                $scope.currentContact = response.contact;
            });
        };

        $scope.newContact = function(newRecord){
            newRecord.profession_id = newRecord.profesion.id;
            delete newRecord.profesion;
            agendaService.saveNewContact(currentCondo.id, newRecord).then( function() {
                $state.go("tabs.agenda");
            });
        };

        var loadModal = function(){
             $ionicModal.fromTemplateUrl('new-review.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });
        };

        $scope.$on("$ionicView.beforeEnter", function (){
            currentCondo = $localStorage.currentCondo;
            $scope.newRecord = {phone: "+569"};
            if ($state.current.name === "agenda-detail") {
                loadContact(currentCondo.id, $stateParams.contactId);
                loadModal();
            } else{
                loadProfesions(currentCondo.id);
            }
        });

        $scope.closeModal = function(){
            $scope.modal.hide();
        };

        $scope.saveReview = function(newReviewText){
            agendaService.newReview(currentCondo.id, {contact_id: parseInt($stateParams.contactId), comment: newReviewText, user_id: currentUser.id}).then(function(response){
                $scope.currentContact.all_reviews.push(response.review);
                $scope.closeModal();
            });
        };

        $scope.newReview = function(){
            $scope.newReviewText = "";
            $scope.modal.show();
        };

        $scope.goBack = function (){
            if ($state.current.name === "agenda-detail") {
        		$state.go("tabs.agenda");
        	} else{
        		$state.go("tabs.home");
        	}
        };
        
    }




}).call(this);