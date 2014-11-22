require('../app').controller('rootCtrl', function ($scope) {

  $scope.menuItems = [[
    {img: 'camera', url: '/photo-add'},
    {img: 'social', url: '/social'},
    {img: 'map', url: '/map'}

  ], [

    {img: 'video', url: '/videochat'},
    {img: 'McD', url: '/nearestMc'},
    {img: 'world', url: '/photo-rate'}

  ]]
});
