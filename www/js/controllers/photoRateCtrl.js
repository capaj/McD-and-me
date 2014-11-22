require('../app').controller('photoUploadCtrl', function($scope, photosInterface) {

  photosInterface.getRand().then(function(data) {
    $scope.imageBase = data;  //photo user can vote on
  });

});
