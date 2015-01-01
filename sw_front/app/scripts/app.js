'use strict';

angular
  .module('swFrontApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])

  //================================================
  // Add an interceptor for AJAX errors
  // https://raw.githubusercontent.com/Anomen/AuthenticationAngularJS/master/public/javascripts/app.js
  // http://stackoverflow.com/questions/23804981/alternative-of-httpprovider-responseinterceptors
  //================================================
  .factory('authInterceptor', function($q, $location) {
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
  })

  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.interceptors.push('authInterceptor');

    //================================================
    // Check if the user is logged in
    // https://raw.githubusercontent.com/Anomen/AuthenticationAngularJS/master/public/javascripts/app.js
    //================================================
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();
      $http.get('/api/loggedin').success(function(user) {
        if (user !== '0') {
          // Authenticated
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
        controller: 'AdminController',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/logout', {
        templateUrl: 'views/main.html',
        controller: 'LogoutController'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function($rootScope, $http) {
    $rootScope.$on('$routeChangeStart', function() {
      $http.get('/api/loggedin').success(function(user) {
        if (user !== '0') {
          $rootScope.isUserLoggedIn = true;
        }
        else {
          $rootScope.isUserLoggedIn = false;
        }
      });
    });
  });
