module.exports = angular.module('app',
    [
        'ngRoute',
        'ngTouch',
        'ngAnimate',
        'webcam',
        'angularMoment',
        'angularLocalStorage'
        // included, but by default not loaded, if you need it, just add it to script manifest
        // 'angular-gestures'
    ]
).config(
    function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);  //Setting HTML5 Location Mode

        require('../routes').forEach(function(routeDef){
            $routeProvider.when(routeDef.route, routeDef.resolve);
        });

        $routeProvider.otherwise({redirectTo:'/404'});
    }
).config(function ($compileProvider) {
    //$compileProvider.debugInfoEnabled(false);
}).run(function() {

      var onSuccess = function(position) {
          alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
      };

// onError Callback receives a PositionError object
//
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });