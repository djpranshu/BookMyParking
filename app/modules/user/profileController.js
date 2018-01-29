'use strict';
 
angular.module('Profile')
 
.controller('ProfileController',
    ['$scope','$rootScope','$log',
    function ($scope , $rootScope , $log) {
    	$scope.profmessage = "Hello pranshu profile...";
      	$scope.welcomeUser = "Welcome User...";

      	 $scope.userViews = [{
        name: 'Account',
        url: 'modules/home/views/account.html',
    	type:'glyphicon-user'},
    {
        name: 'Booking History',
        url: 'modules/home/views/mybookings.html',
    	type:'glyphicon-credit-card'},
    	{
        name: 'Settings',
        url: 'modules/home/views/settings.html',
    	type:'glyphicon-cog'}];

$scope.loadUserPartial = function(link) {
    $scope.currentUserPartial =  link;
}

    }]);