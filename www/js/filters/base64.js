require('../app').filter('base64', function() {
  return function(v) {
    return 'data:image/png;base64,' + v;
  }
});