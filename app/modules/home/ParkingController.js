'use strict';

angular.module('Parking')

.controller('ParkingController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','$timeout',
    function ($scope, $rootScope, $location, AuthenticationService,$timeout) {
    	$scope.message = "Hello Parking page...";

          $scope.bookingId = "QWERTYU";
          $scope.bookingData ="";
          //

            AuthenticationService.Parking($scope.bookingId, function(response) {

            $scope.bookingData = response.message;
            console.log("data:::",$scope.bookingData);

            });




    }]);
