require('jquery');
require('angular');
require('angular-animate');
require('./lib/angular-route/angular-route');
require('./lib/angular-touch/angular-touch');
require('angular-moment');
require('github:jonashartmann/webcam-directive/dist/webcam.min');
require('./lib/angularLocalStorage-nc/dist/angularLocalStorage.min');
require('github:mgcrea/angular-strap/src/navbar/navbar');
require('github:GoDisco/ngFacebook');
angular.module('ngTools', []);
require('github:capaj/ng-tools/src/include-in-scope');
require('github:gajus/angular-swing/dist/angular-swing');
require('github:capaj/angularLocalStorage/dist/angularLocalStorage.min');

require('./js/bootstrap/bootstrap');
require('./js/controllers/root-ctrl');
require('./js/controllers/nearestMCController');
require('./js/controllers/photoRateCtrl');

require('./js/directives/fb-user');
require('./js/directives/imageUpload');
require('./js/user/fbUser');
require('./js/controllers/videochatCtrl');
require('./js/filters/base64');
require('./js/controllers/photoCtrl');
require('rpc:rpc-client-angular');
require('./js/app');
require('./js/directives/angular-camera');
