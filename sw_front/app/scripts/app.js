'use strict';

angular
  .module('swFrontApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider, $locationProvider, $httpProvider, $provide) {

  //================================================
  // Check if the user is logged in
  // https://raw.githubusercontent.com/Anomen/AuthenticationAngularJS/master/public/javascripts/app.js
  //================================================
  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    // Initialize a new promise
    var deferred = $q.defer();

    // Make an AJAX call to check if the user is logged in
    $http.get('/api/loggedin').success(function(user) {
      // Authenticated
      if (user !== '0') {
        $timeout(deferred.resolve, 0);
      }
      else {
        // Not Authenticated
        $rootScope.message = 'You need to log in.';
        $timeout(function() {
          deferred.reject();
        }, 0);
        $location.url('/login');
      }
    });

    return deferred.promise;
  };
  //================================================

  //================================================
  // Add an interceptor for AJAX errors
  // https://raw.githubusercontent.com/Anomen/AuthenticationAngularJS/master/public/javascripts/app.js
  // http://stackoverflow.com/questions/23804981/alternative-of-httpprovider-responseinterceptors
  //================================================
    $provide.factory('myHttpInterceptor', function($q, $location) {
      return {
        // Success
        'response': function(response) {
          return response;
        },
        // Error: check the error status to get only the 401
       'responseError': function(rejection) {
          if (rejection.status === 401 && $location.url() !== '/login') {
            $location.url('/login');
          } else {
            return $q.reject(rejection);
          }
        }
      };
    });

    $httpProvider.interceptors.push('myHttpInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/edges', {
        templateUrl: 'views/edges.html',
        controller: 'EdgesCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
