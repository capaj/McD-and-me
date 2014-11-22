require('../app').controller('videochatCtrl', function($scope) {

  $scope.onStream = function(stream) {
    console.log(stream);

  };

  $scope.noOneOnChat = true;
});
