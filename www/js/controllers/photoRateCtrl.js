require('../app').controller('photoRateCtrl', function($scope, photosInterface, $filter, $timeout) {
  var lastId = -1;
  var addAnotherToSwiper = function() {
    lastId += 1;

    return photosInterface.getRand(lastId).then(function(img) {
      img.data = $filter('base64')(img.data);
      //lastId = img.id;
      console.log("added img ", img.id);
      $scope.swiperPhotos.push(img); //photo user can vote on
      return lastId;
    }, function(err) {
      if ($scope.swiperPhotos[0] !== null) {
        $scope.swiperPhotos.push(null);
      }
      return err;
    });
  };

  $scope.swiperPhotos = [];

  addAnotherToSwiper().then(addAnotherToSwiper);

  $scope.onThrow = function(ev, img, index) {
    var pos = $(ev.target.children[0]).offset();
    console.log("pos", pos);
    if (ev.throwDirection !== undefined) {
      if (ev.throwDirection > 0) {
        $scope.like(img, index);
        $scope.userLiked = true;
      } else {
        $scope.userDisliked = true;
      }
    }

    $scope.remove(index, ev);
  };

  $scope.remove = function (index, ev) {
    $timeout(function() {
      $scope.userLiked = false;
      $scope.userDisliked = false;

    }, 700);
    if ($scope.swiperPhotos.length === 1) {
      //nothing-no more photos to show
    } else {
      $scope.swiperPhotos.splice(index, 1);
      addAnotherToSwiper();
    }
  };

  $scope.like = function(img, index) {
    //add a like to the photo
    console.log("liked ", img.id);
  };

  $scope.add = function (name) {
    $scope.cards.push({name: name});
  };
});
