require('../app').controller('rootCtrl', function ($scope) {

  $scope.menuItems = [[
    {img: 'camera'},
    {img: 'coffeetime-button'},
    {img: 'comp'}
  ], [
    {img: 'map'},
    {img: 'McD'},
    {img: 'settings'}
  ], [
    {img: 'social'},
    {img: 'video'},
    {img: 'world'}
  ]];
});
