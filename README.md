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