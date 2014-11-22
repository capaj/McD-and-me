require('../app').controller('rootCtrl', function($scope, storage, fbUser) {

  $scope.menuItems = [[
    {img: 'camera', url: '/photo-add'},
    {img: 'world', url: '/photo-rate'}
  ], [

    {img: 'video', url: '/videochat'},
    {img: 'McD', url: '/nearestMc'}

  ],[
    {img: 'social', url: '/social'},
    {img: 'map', url: '/map'}
  ]];

  var user = storage.get('fbUser');

  var login = function() {
    fbUser().then(function(me) {
      $scope.user = me;
    });
  };

  if (user) {
    login();  //if user already logged in we just want to get his credentials immediately
  } else {
    $scope.loginToFB = login;
  }


});
