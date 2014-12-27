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
  /node_modules/protractor/bin/protractor test/e2e.conf.js
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