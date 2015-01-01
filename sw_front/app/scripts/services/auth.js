'use strict';
// AngularJS will instantiate a singleton by calling "new" on this function
angular.module('swFrontApp')
  .service('auth', function ($http) {
    this.login = function(user) {
      var postData = {email: user.email, password: user.password};
      console.log('auth service calling $http.post with postData: ' + JSON.stringify(postData));
      // return $http.post('/api/login', postData);
      return $http.post('/api/login', user);
    };
  });
