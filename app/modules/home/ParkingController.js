'use strict';
var cities = [
{
city : 'Toronto',
desc : 'This is the best city in the world!',
lat : 18.558106,
long : 73.809699
},
{
city : 'New York',
desc : 'This city is aiiiiite!',
lat : 18.558899,
long : 73.8096988
},
{
city : 'Chicago',
desc : 'This is the second best city in the world!',
lat : 18.558699,
long : 73.8096977
},
{
city : 'Los Angeles',
desc : 'This city is live!',
lat : 18.558688,
long : 73.8096866
},
{
city : 'Las Vegas',
desc : 'Sin City...\'nuff said!',
lat : 18.558455,
long : 73.8096554
}
];
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


// var mapOptions = {
//         zoom: 4,
//         center: new google.maps.LatLng(40.0000, -98.0000),
//         mapTypeId: google.maps.MapTypeId.TERRAIN
//     }
//
//     $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
//
//     $scope.markers = [];
//
//     var infoWindow = new google.maps.InfoWindow();
//
//     var createMarker = function (info){
//
//         var marker = new google.maps.Marker({
//             map: $scope.map,
//             position: new google.maps.LatLng(info.lat, info.long),
//             title: info.city
//         });
//         marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
//
//         google.maps.event.addListener(marker, 'click', function(){
//             infoWindow.setContent('<h2 style="color:black;">' + marker.title + '</h2>' + marker.content);
//             infoWindow.open($scope.map, marker);
//         });
//
//         $scope.markers.push(marker);
//
//     }
//
//
//     for (var i = 0; i < cities.length; i++){
//
//         createMarker(cities[i]);
//     }

 initAutocomplete();
function initAutocomplete() {
  console.log("in init auto complete");
       var map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: -33.8688, lng: 151.2195},
         zoom: 16,
         mapTypeId: 'roadmap'
       });

       // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];
          var infoWindow = new google.maps.InfoWindow();
          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            $scope.createMarker = function(info){
              console.log("infooooooss",info.city);

              var marker = new google.maps.Marker({
                          map: map,
                            position: new google.maps.LatLng(info.lat, info.long),
                          title: info.city,
                          icon: icon,
                      });
                      marker.content = '<div class="infoWindowContent">' + info.desc+'<button class="book_parking_button">Book Spot</button>' + '</div>';
                     google.maps.event.addListener(marker, 'click', function(){
                         infoWindow.setContent('<h2 style="color:black;">' + marker.title + '</h2>' +marker.content);
                         infoWindow.open(map, marker);
                     });

                     markers.push(marker);
            };
            // Create a marker for each place.
            // markers.push(new google.maps.Marker({
            //   map: map,
            //   icon: icon,
            //   title: place.name,
            //   position: place.geometry.location
            // }));

            // var marker = new google.maps.Marker({
            //             map: map,
            //               position: place.geometry.location,
            //             title: place.name
            //         });
            //         marker.content = '<div class="infoWindowContent">' + "PRANSHU" + '</div>';
            //        google.maps.event.addListener(marker, 'click', function(){
            //            infoWindow.setContent('<h2 style="color:black;">' + "HELLO" + '</h2>' +marker.content);
            //            infoWindow.open(map, marker);
            //        });
            //
            //        markers.push(marker);

            for (var i = 0; i < cities.length; i++){

                    $scope.createMarker(cities[i]);
                }

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });

}



    }]);
