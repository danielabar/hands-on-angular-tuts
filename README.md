Hands on Angular
==========

> Learning Angular and Rails with Tuts Plus [course](https://code.tutsplus.com/courses/hands-on-angular).

## Protractor E2E Testing

First install Protractor

  ```bash
  npm install protractor --save-dev
  ```

Use Protractor bin to install or update Selenium web driver

  ```bash
  ./node_modules/protractor/bin/webdriver-manager update
  ```

Configuration

  ```bash
  cp ./node_modules/protractor/example/conf.js test/e2e.conf.js
  ```

Start web driver

  ```bash
  ./node_modules/protractor/bin/webdriver-manager start
  ```

Open another tab and run tests

  ```bash
  ./node_modules/protractor/bin/protractor test/e2e.conf.js
  ```

## Testing with Rails

Edit `Gemfile` add a development section

  ```ruby
  group :development, :test do
    # Call 'byebug' anywhere in the code to stop execution and get a debugger console
    gem 'byebug'

    # Access an IRB console on exception pages or by using <%= console %> in views
    gem 'web-console', '~> 2.0'

    # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
    gem 'spring'

    # Testing
    gem 'rspec-rails'
    gem 'capybara'
    gem 'selenium-webdriver'
  end
  ```

Install new dependencies

  ```bash
  bundle
  ```

Initialize rspec

  ```bash
  rails g rspec:install
  ```

Run tests

  ```bash
  rspec spec/features/navigation_spec.rb
  ```

## Repeater

`ng-repeat-start` and `ng-repeat-end` can be used to prolong the scope of `ng-repeat` iterator in a template.
[Example](sw_front/app/views/edges.html)

## Filter

By default, piping the output of a repeater through `filter` searches through ALL attributes

  ```html
  <li ng-repeat-start="edge in edges | filter:filterBy.search"">
    ```

To only search a single attribute, for example `name`

  ```html
  <li ng-repeat-start="edge in edges | filter: {name: filterBy.search}">
  ```

Custom filter [example](sw_front/app/scripts/filters/edges.js) and [unit test](sw_front/test/spec/filters/edges.js).

## Select

To have angular populate a select box with options. For example, given that `categories` is in scope:

  ```html
  <select name="searchByCategory" id="searchByCategory" class="form-control"
    ng-model="filterBy.category"
    ng-options="c.name for c in categories">
  </select>
  ```

## HTTP

Use Angular's http mock to unit test components that make a ajax requests.
To use it, inject `$httpBackend` into controller unit tests. [Example](sw_front/test/controllers/edges.js)

When working with mock http, its a good idea to make sure there are no leftover pending requests.
Use `afterEach` to verify `verifyNoOutstandingExpectation` and `verifyNoOutstandingRequest`.

To simulate an http request in a test

  ```javascript
  http.expectGET('/api/edges');
  http.flush();
  ```

## Rails Controller

So that angular front end app can make /api calls to get edges.

First add api namespace to [routes](sw-backend/config/routes.rb)

Add a [controller](sw-backend/app/controllers/api/edges_controller.rb) and [controller test](sw-backend-spec/controllers/edges_controller_spec.rb)

## Rails Models

Generate the models

  ```bash
  rails g model edge name description:text category:references
  rails g model requirement name value mode
  rails g model category name
  ```

Setup app and test databases

  ```bash
  rake db:migrate
  rake db:test:prepare
  ```

Use Active Model Serializer to generate JSON representation of models.
Add it to [gemfile](sw-backend/Gemfile), then run `bundle`

Generate

  ```bash
  rails g serializer edge
  rails g serializer requirement
  rails g serializer category
  ```
Edit the generated `{model}_serializer.rb` files to specify attributes.

If any changes are  made to `{timestamp}_create_{model}.rb` files to modify the database schema, run

  ```bash
  rake db:drop
  rake db:migrate
  rake db:test:prepare
  ```
By default, rails active model serializer will generate root element. But angular app expects a list of results without a root element.
To fix this, specify `root: false` in rails controller

  ```ruby
  module Api
    class EdgesController < ApplicationController
      def index
        render json: Edge.all, root: false
      end
    end
  end
  ```

## Express backend

Having trouble with rails active model serializer not following edge relationships and generating expected json.
To not get stuck, use express back end

  ```bash
  cd sw-express
  DEBUG=myapp ./bin/www
  ```

## Angular Forms

Example [view](sw_front/app/views/login.html) and [controller](sw_front/app/scripts/controllers/login.js)

To activate Angular form validations, form must have a name AND must disable HTML5 form validation.
The form name will appear as a property on $scope, which is then available in the controller.

  ```html
  <form class="form" name="loginForm" novalidate>
    ...
  </form>
  ```

To have Angular control the form submission, use `ng-submit` directive

  ```html
  <form class="form" name="loginForm" novalidate ng-submit="login()">
    ...
  </form>
  ```

To check if form is valid in a controller

  ```javascript
  $scope.login = function() {
    if ($scope.loginForm.$valid) {
      // do something with form data...
    }
  }
  ```

Optionally, can choose to display error messages to user only when form is submitted.

To disable submit form button until form is valid

  ```html
  <button class="btn btn-primary" type="submit" ng-disabled="loginForm.$invalid">Log In</button>
  ```

## Angular Directive

Preferred approach is to display error messages on blur, i.e. when field loses focus.
This requires a [custom directive](sw_front/app/scripts/directives/cu-focus.js).

To use angular models in a directive, use `require: 'ngModel'.
This makes the model controller available as fourth argument in the `link` function.
See Angular [Directive doc](https://docs.angularjs.org/guide/directive) for more details, specificlly, "Creating Directives that Communicate".

`link` function in directive allows us to listen to events such as `blur`.

### Naming

camelCase is used javascript

  ```javascript
  angular.module('swFrontApp')
    .directive('cuFocus', function () {
      return {
        restrict: 'A',
        require: 'ngModel',
        // rest of logic goes here...
      };
    });
  ```

But snake-case is used in html

  ```html
  <input id="userEmail" type="email" name="email" class="form-control" ng-model="user.email" required cu-focus/>
  ```

## Token Based Authentication

Steps:

* Client sends credentials (such as email or username and password) to server, for example, via login form.
* Server checks if credentials are valid, generate unique token, saves it (eg: in a database), and returns token to client
* Client saves this token somewhere (cookie or local storage)
* Client includes this token on every subsequent request to server
* Server checks for token on every resource that requires authentication

### Angular HTTP Interceptor

Can configure an interceptor to intervene in all ajax requests, and modify request or response, success or error cases.
Interceptor is implemeted as a `factory`. For example, to check all response errors for 401 and redirect user to login page:

  ```javascript
  .factory('myCustomHttpInterceptor', function($q, $location) {
    return {
      'response': function(response) {
        return response;
      },
     'responseError': function(rejection) {
        if (rejection.status === 401 && $location.url() !== '/login') {
          $location.url('/login');
        } else {
          return $q.reject(rejection);
        }
      }
    };
    ```

Can also use interceptor to modify every request, for example, suppose an auth_token is persisted in local storage,
and would like to include it as http header for every ajax request

  ```javascript
  .factory('myCustomHttpInterceptor', function($q, $location) {
    return {
      'request': function(config) {
        config.headers = config.headers || {};
        if (localStorage.auth_token) {
          config.headers.token = localStorage.auth_token;
        }
        return config;
      }
    };
  ```

To make your custom http interceptor actually be used by angular, use $httpProvider.
This would go somewhere in `app.js` where main Angular application (routes etc) is configured.

  ```javascript
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('myCustomHttpInterceptor');
  })
  ```

## ngResource

To create a new resource using ngResource

  ```html
  <!-- edges.html -->
  <form name="newEdgeForm" ng-submit="createEdge()">
    <input type="text" name="name" class="form-control" ng-model="newEdge.name" />
    <textarea name="description" class="form-control" ng-model="newEdge.description"></textarea>
    <!-- remainder of newEdge bound input fields... -->
  </form>
  ```

  ```javascript
  // services/edgeresource.js
  angular.module('swFrontApp')
    .factory('EdgeResource', function ($resource) {
      return $resource('/api/edges');
    });

  // controllers/edge.js
  angular.module('swFrontApp')
    .controller('EdgesCtrl', function ($scope, EdgeResource) {
      $scope.newEdge = new EdgeResource;
    });
  ```