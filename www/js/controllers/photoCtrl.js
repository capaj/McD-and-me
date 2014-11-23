require('../app').controller('photoUploadCtrl', function($scope, photosInterface, $facebook) {

  $scope.saveToBackend = function(imgData){
  	photosInterface.save(imgData).then(function(){
  	    $scope.result = "succesfully saved";
        //$facebook.
  	});
  };

  $scope.countdown = 3;

  $scope.upload = function() {
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });

    function onSuccess(imageData) {
      var image = document.getElementById('myImage');
      image.src = "data:image/jpeg;base64," + imageData;
    }

    function onFail(message) {
      console.error('Failed because: ' + message);
    }
  }
});
