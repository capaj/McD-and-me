var fbInit = require('./user/fbInit');
module.exports = angular.module('mcdAndMe',
  [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'webcam',
    'angularMoment',
    'angularLocalStorage',
    'mgcrea.ngStrap.navbar',
    'RPC',
    'ngTools',
    'ngFacebook',
    'gajus.swing'

    // included, but by default not loaded, if you need it, just add it to script manifest
    // 'angular-gestures'
  ]
).config(
  function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);  //Setting HTML5 Location Mode

    require('../routes').forEach(function(routeDef) {
      $routeProvider.when(routeDef.route, routeDef.resolve);
    });

    $routeProvider.otherwise({redirectTo: '/404'});
  }
).config(function($compileProvider) {
    //$compileProvider.debugInfoEnabled(false);
  }).run(function($RPC) {

    fbInit();
    var backend1 = $RPC('http://localhost');
    var onSuccess = function(position) {
      console.log('Latitude: ' + position.coords.latitude + '\n' +
      'Longitude: ' + position.coords.longitude + '\n' +
      'Altitude: ' + position.coords.altitude + '\n' +
      'Accuracy: ' + position.coords.accuracy + '\n' +
      'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
      'Heading: ' + position.coords.heading + '\n' +
      'Speed: ' + position.coords.speed + '\n' +
      'Timestamp: ' + position.timestamp + '\n');
    };

// onError Callback receives a PositionError object
//
    function onError(error) {

    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  })
  .config(function($facebookProvider) {
    $facebookProvider.setAppId('798709180187630');
  });