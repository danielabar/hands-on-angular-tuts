'use strict';
// AngularJS will instantiate a singleton by calling "new" on this function
angular.module('swFrontApp')
  .service('auth', function ($http) {
    this.login = function(user) {
      return $http.post('/api/login', {email: user.email, password: user.password});
    };
    this.logout = function() {
      return $http.post('/api/logout');
    };
    this.isLoggedIn = function() {
      return $http.get('/api/loggedin');
    };
  });
