require('../app').controller('photoUploadCtrl', function($scope, photosInterface) {

  $scope.saveToBackend = function(imgData){
  	photosInterface.save(imgData).then(function(){
  	    console.log("succesfully saved");
  	});
  };

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
