'use strict';

angular.module('Home',['ui.bootstrap'])

.controller('HomeController',
    ['$scope','$rootScope','$log','$cookieStore','$location','AuthenticationService',
    function ($scope , $rootScope , $log,$cookieStore, $location,AuthenticationService) {


      $scope.globles = $cookieStore.get('globals', $rootScope.globals);
      console.log("globles:::::::",$scope.globles);
      $scope.email = $scope.globles.currentUser.email;
      $scope.firstname = $scope.globles.currentUser.firstName;
      $scope.lastname = $scope.globles.currentUser.lastName;
      $scope.username = $scope.globles.currentUser.userName;

       $scope.items = [
    'My Bookings',
    'Profile'
  ];

   $scope.templates = [{
        name: 'View Profile',
        url: 'modules/home/views/userprofile.html'},
    {
        name: 'My Bookings',
        url: 'modules/home/views/userprofile.html'}];


    $scope.views = [{
        name: 'View Parkings',
        url: 'modules/home/views/parkings.html'},
    {
        name: 'Book Parking',
        url: 'modules/home/views/parkings.html'},
    {
        name: 'Offers',
        url: 'modules/home/views/offers.html'}];


$scope.loadPartial = function(link) {
    $scope.currentPartial =  link;


}
$scope.setinvisible = function(link) {
    $scope.currentPartial =  link;

}

$scope.goHome = function(path) {
    $scope.loadPartial(path);
}

  $scope.status = {
    isopen: false
  };




  $scope.toggled = function(open) {
    $log.log('Dropdown is now: ', open);
  };

  $scope.toggleDropdown = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.status.isopen = !$scope.status.isopen;
  };

    }]);
