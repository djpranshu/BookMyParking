'use strict';
 
angular.module('Booking')
 
.controller('BookingController',
    ['$scope','$rootScope','$log',
    function ($scope , $rootScope , $log) {
    	$scope.message = "Hello Booking page...";
      
    }]);