'use strict';

var EdgePage = function() {

  this.usTabContent = element(by.css('[module=app-us] .tab-content'));

  this.tabs = element.all(by.repeater('pane in panes'));

  this.navigate = function() {
    browser.get('/#/edges');
  };
};


module.exports = new EdgePage();
