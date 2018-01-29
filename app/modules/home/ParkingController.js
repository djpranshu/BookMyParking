'use strict';
 
angular.module('Parking')
 
.controller('ParkingController',
    ['$scope','$rootScope','$log',
    function ($scope , $rootScope , $log) {
    	$scope.message = "Hello Parking page...";
      
    }]);