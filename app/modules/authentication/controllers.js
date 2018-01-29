'use strict';

angular.module('Authentication')

.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','$timeout',
    function ($scope, $rootScope, $location, AuthenticationService,$timeout) {
        // reset login status
        AuthenticationService.ClearCredentials();


        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {

                if(response.success) {
                    AuthenticationService.SetCredentials(response);
                    $location.path('/main');

                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.register = function(){

            AuthenticationService.RegisterUser($scope.email, $scope.password ,$scope.username ,$scope.firstname , $scope.lastname ,function(response) {
                $scope.success = response.message;
                $scope.error = response.error;

                if(!$scope.error){
                  $timeout(function(){
                    $scope.success = false;
                    window.location.reload();
                    $location.path('/login');
                  }, 3000);
                }else {
                  $timeout(function(){
                    $scope.success = false;
                  }, 3000);

                }


            });


        };
    }]);
