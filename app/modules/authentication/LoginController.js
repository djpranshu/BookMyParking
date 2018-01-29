'use strict';
 
angular.module('Login')
 
.controller('LoginController',
    ['$scope','$rootScope','$log',
    function ($scope , $rootScope , $log) {
    	$scope.message = "Hello login page...";
      
    }]);