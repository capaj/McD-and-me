angular.module('mcdAndMe').directive('ngCamera', ["$timeout", "$sce", function($timeout, $sce) {
  return {
    require: 'ngModel',
    template: '<div class="ng-camera clearfix">\
        <p ng-hide="isLoaded">Loading Camera...</p>\
        <p ng-show="noCamera">Couldn\'t find a camera to use</p>\
        <div class="ng-camera-stack" ng-hide="!isLoaded">\
          <div class="ng-camera-countdown" ng-show="activeCountdown">\
            <p class="tick">{{countdownText}}</p>\
          </div>\
          <img class="ng-camera-overlay" ng-hide="!overlaySrc" ng-src="{{overlaySrc}}" width="{{width}}" height="{{height}}">\
          <video id="ng-camera-feed" autoplay ng-hide="overlaySrc" width="{{width}}" height="{{height}}" src="{{videoStream}}">Install Browser\'s latest version</video>\
          <canvas id="ng-photo-canvas" width="{{captureWidth}}" height="{{captureHeight}}" style="display:none;"></canvas>\
        </div>\
        \<div><div/>\
        <div class="ng-camera-controls">\
          <div class="photo-actions">\
          <div class="row">\
          <div><i class="glyphicon glyphicon-thumbs-up" ng-click="acceptCallback()" ng-show="media"></i></div>\
          <div class="countdown-enabler" ng-class="{enabled: countdown === 3}" ng-click="countdownSwitch()" ng-hide="true"></div>\
          <div class="camera-icon" ng-hide="media" ng-click="takePicture()" ng-hide="hideUI || activeCountdown"></div>\
          <div class="trash" ng-class="{enabled: media}" ng-click="trashPhoto()" ng-show="media"></div>\
          </div>\
        </div>\
        </div>\
      </div>',
    replace: false,
    transclude: true,
    restrict: 'E',
    scope: {
      type: '@',
      media: '=ngModel',
      width: '@',
      height: '@',
      captureWidth: '@',
      captureHeight: '@',
      overlaySrc: '=',
      countdown: '=',
      captureCallback: '&capture',
      acceptCallback: '&',
      enabled: '=',
      captureMessage: "@"
    },
    link: function(scope, element, attrs, ngModel) {
      if (!scope.captureWidth) {
        scope.captureWidth = scope.width;
      }
      if (!scope.captureHeight) {
        scope.captureHeight = scope.height;
      }

      scope.trashPhoto = function() {
        scope.media = null;
      };

      scope.activeCountdown = false;
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
      scope.$on('$destroy', function() {
        if (scope.stream && typeof scope.stream.stop === 'function') {
          scope.stream.stop();
        }
      });
      /**
       * @description Set mediastream source and notify camera
       */

      scope.enableCamera = function() {
        return navigator.getUserMedia({
          audio: false,
          video: true
        }, function(stream) {
          return scope.$apply(function() {
            scope.stream = stream;
            scope.isLoaded = true;
            return scope.videoStream = $sce.trustAsResourceUrl(window.URL.createObjectURL(stream));
          });
        }, function(error) {
          return scope.$apply(function() {
            scope.isLoaded = true;
            return scope.noCamera = true;
          });
        });
      };
      /**
       * @description Disable mediastream source and notify camera
       */

      scope.disableCamera = function() {
        return navigator.getUserMedia({
          audio: false,
          video: true
        }, function(stream) {
          return scope.$apply(function() {
            return scope.videoStream = "";
          });
        });
      };

      /**
       * @description Capture current state of video stream as photo
       */

      scope.takePicture = function() {
        var canvas, context, countdownTick, countdownTime;
        canvas = window.document.getElementById('ng-photo-canvas');
        countdownTime = scope.countdown != null ? scope.countdown * 1000 : 0;
        if (canvas != null) {
          if (countdownTime > 0) {
            scope.activeCountdown = true;
            scope.hideUI = true;
          }
          context = canvas.getContext('2d');
          if (scope.countdownTimer) {
            $timeout.cancel(scope.countdownTimer);
          }
          scope.countdownTimer = $timeout(function() {
            var cameraFeed;
            scope.activeCountdown = false;
            cameraFeed = window.document.getElementById('ng-camera-feed');
            context.drawImage(cameraFeed, 0, 0, scope.captureWidth, scope.captureHeight);
            if (scope.overlaySrc != null) {
              scope.addFrame(context, scope.overlaySrc, function(image) {
                scope.$apply(function() {
                  return scope.media = canvas.toDataURL('image/jpeg');
                });
                if (scope.captureCallback != null) {
                  return scope.captureCallback(scope.media);
                }
              });
            } else {
              scope.media = canvas.toDataURL('image/jpeg');
              if (scope.captureCallback != null) {
                scope.captureCallback(scope.media);
              }
            }
            return scope.hideUI = false;
          }, countdownTime + 1000);
          scope.countdownText = scope.countdown;
          countdownTick = setInterval(function() {
            return scope.$apply(function() {
              var nextTick;
              nextTick = scope.countdownText - 1;
              if (nextTick === 0) {
                scope.countdownText = scope.captureMessage != null ? scope.captureMessage : 'GO!';
                return clearInterval(countdownTick);
              } else {
                return scope.countdownText = nextTick;
              }
            });
          }, 1000);
        } else {

        }
        return false;
      };
      /**
       * @description Add overlay frame to canvas render
       * @param {Object} context Reference to target canvas context
       */

      scope.addFrame = function(context, url, callback) {
        var overlay;
        if (callback == null) {
          callback = false;
        }
        overlay = new Image();
        overlay.onload = function() {
          context.drawImage(overlay, 0, 0, scope.width, scope.height);
          if (callback) {
            return callback(context);
          }
        };
        overlay.crossOrigin = '';
        return overlay.src = url;
      };
      /**
       * @description Keeps a packaged version of media ready
       * @param {Base64} newVal Prefix-stripped Base64 of of canvas image
       */

      scope.$watch('media', function(newVal) {
        if (newVal != null) {
          return scope.packagedMedia = scope.media.replace(/^data:image\/\w+;base64,/, "");
        }
      });
      /**
       * @description Preloader for overlay image
       */

      scope.$watch('overlaySrc', function(newVal, oldVal) {
        var preloader;
        if (scope.overlaySrc != null) {
          scope.isLoaded = false;
          preloader = new Image();
          preloader.crossOrigin = '';
          preloader.src = newVal;
          return preloader.onload = function() {
            return scope.$apply(function() {
              return scope.isLoaded = true;
            });
          };
        } else {
          return scope.isLoaded = true;
        }
      });
      /**
       * @description Watch for when to turn on/off camera feed
       */

      scope.$watch('enabled', function(newVal, oldVal) {
        if (newVal) {
          if (!oldVal) {
            return scope.enableCamera();
          }
        } else {
          if (oldVal != null) {
            return scope.disableCamera();
          }
        }
      });
      /**
       * @description Check format type of camera.
       * @todo Future support for different media types (GIF, Video)
       */

      return scope.$watch('type', function() {
        switch (scope.type) {
          case 'photo':
            if (scope.enabled) {
              return scope.enableCamera();
            }
            break;
          default:
            if (scope.enabled) {
              return scope.enableCamera();
            }
        }
      });
    }
  };
}]);

