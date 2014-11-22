require('../app').factory('fbUser', function(storage, $facebook) {
    return function() {
      return $facebook.login().then(function() {
        return $facebook.api('/me').then(function(me) {
          storage.set('fbUser', me.id);
          return me;
        });
      });
    };
});