require('../app').factory('fbUser', function(storage, $q, $facebook) {
    return function() {
      var user = storage.get('fbUser');
      if (user) {
        return $q.when(user);
      }
      return $facebook.login().then(function() {
        return $facebook.api('/me').then(function(me) {
          storage.set('fbUser', me);
          return me;
        });
      });
    };
});