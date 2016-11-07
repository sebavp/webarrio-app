(function() {
    'use strict';

    angular
        .module('WeBarrio.controllers')
        .controller('accountController', accountController);

    function accountController($scope, $state, $ionicHistory, dataAPIService, $localStorage) {
        
        console.info("accountController init");

        var currentDepto =  $localStorage.currentDepto;
        if (currentDepto) {
          dataAPIService.getCommonExpenses(currentDepto[0].id).then(function(resp){
            $scope.commonExpenses = resp.data.common_expenses;
            console.log($scope.commonExpenses)
          })
        };

        $scope.seeDetail = function (item){
            if (item.id === $scope.showDetail) {
                $scope.showDetail = null
            } else {
                $scope.showDetail = item.id;
            }
        }


        $scope.goBack = function (){
        	if (_.isNull($ionicHistory.viewHistory().backView)) {
        		$state.go("tabs.dashboard")
        	} else{
        		$ionicHistory.goBack();	
        	} 
        };
        
    }




}).call(this);