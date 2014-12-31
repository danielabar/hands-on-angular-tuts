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

Preferred approach is to display error messages on blur, i.e. when field loses focus. This requires a custom directive.