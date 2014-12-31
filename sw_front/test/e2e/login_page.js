'use strict';

var LoginPage = function() {

  this.navigate = function() {
    browser.get('/#/login');
  };

};


module.exports = new LoginPage();
