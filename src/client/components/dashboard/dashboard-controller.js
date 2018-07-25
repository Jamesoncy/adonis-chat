angular
		.module('app')
		.controller('Admin.DashboardController', ['$scope', Controller]);
	
	function Controller($scope) { 
       $scope.click = function() {
		   alert();
	   }
    }