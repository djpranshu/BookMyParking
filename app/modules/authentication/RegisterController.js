'use strict';
 
angular.module('Register')
 
.controller('RegisterController',
    ['$scope','$rootScope',
    function ($scope , $rootScope) {
    	$scope.registerMessage = "in home controller";
    	
       console.log("In register controller..");

    }]);