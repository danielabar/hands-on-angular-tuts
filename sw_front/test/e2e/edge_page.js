'use strict';

var EdgePage = function() {

  this.navigate = function() {
    browser.get('/#/edges');
  };

  this.categoryOptions = function() {
    return element.all(by.options('c.name for c in categories'));
  };

  this.rankOptions = function() {
    return element.all(by.options('r.name for r in ranks'));
  };

  this.selectOption = function(optionVal) {
    element(by.cssContainingText('option', optionVal)).click();
  };

  this.edges = function() {
    return element.all(by.binding('edge.name'));
  };

  this.clickEdge = function(zeroBasedEdgeIndex) {
    var edgeToClick = element.all(by.css('li.e2e-edge')).get(zeroBasedEdgeIndex);
    edgeToClick.click();
  };

};


module.exports = new EdgePage();
