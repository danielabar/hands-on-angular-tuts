'use strict';

describe('Edges Page', function() {
  var edgePage = require('./edge_page.js');

  var EXPECTED_NUM_EDGES = 7;

  beforeEach(function () {
    edgePage.navigate();
  });

  it('Displays a list of edges', function() {
    var categories = element.all(by.binding('edge.category.name'));
    expect(categories.count()).toEqual(EXPECTED_NUM_EDGES);
    expect(categories.get(0).getText()).toEqual('Background');
    expect(categories.get(1).getText()).toEqual('Background');
    expect(categories.get(2).getText()).toEqual('Background');
    expect(categories.get(3).getText()).toEqual('Combat');
    expect(categories.get(4).getText()).toEqual('Combat');
    expect(categories.get(5).getText()).toEqual('Leadership');
    expect(categories.get(6).getText()).toEqual('Leadership');

    var names = edgePage.edges();
    expect(names.count()).toEqual(EXPECTED_NUM_EDGES);
    expect(names.get(0).getText()).toEqual('Background Attractive (Novice, Vigor d6)');
    expect(names.get(1).getText()).toEqual('Background Very Attractive (Novice, Attractive)');
    expect(names.get(2).getText()).toEqual('Background Brave (Novice, Spirit d6)');
    expect(names.get(3).getText()).toEqual('Combat Block (Seasoned, Fighting d8)');
    expect(names.get(4).getText()).toEqual('Combat Brawler (Novice, Strength d6)');
    expect(names.get(5).getText()).toEqual('Leadership Command (Novice, Smarts d6)');
    expect(names.get(6).getText()).toEqual('Leadership Hold the Line! (Seasoned, Smarts d8, Command)');
  });

  it('Descriptions are hidden', function() {
    element.all(by.binding('edge.description')).each(function(element) {
      element.isDisplayed().then(function(result) {
        expect(result).toBeFalsy();
      });
    });
  });

  it('Clicking on an edge toggles its description display', function() {
    var descriptions = element.all(by.binding('edge.description'));
    edgePage.clickEdge(0);

    expect(descriptions.get(0).isDisplayed()).toBeTruthy();
    expect(descriptions.get(0).getText()).toContain('beautiful people');

    edgePage.clickEdge(0);
    expect(descriptions.get(0).isDisplayed()).toBeFalsy();
  });

  it('Displays category options', function() {
    var categoryOptions = edgePage.categoryOptions();
    expect(categoryOptions.count()).toEqual(7);
    expect(categoryOptions.get(0).getText()).toBe('All');
    expect(categoryOptions.get(1).getText()).toBe('Background');
    expect(categoryOptions.get(2).getText()).toBe('Combat');
    expect(categoryOptions.get(3).getText()).toBe('Leadership');
  });

  it('Displays rank options', function() {
    var rankOptions = edgePage.rankOptions();
    expect(rankOptions.count()).toEqual(3);
    expect(rankOptions.get(0).getText()).toBe('All');
    expect(rankOptions.get(1).getText()).toBe('Novice');
    expect(rankOptions.get(2).getText()).toBe('Seasoned');
  });

  it('Selecting a category option filters the results by that category', function() {
    edgePage.selectOption('Background');

    var names = edgePage.edges();
    expect(names.count()).toEqual(3);
    expect(names.get(0).getText()).toEqual('Background Attractive (Novice, Vigor d6)');
    expect(names.get(1).getText()).toEqual('Background Very Attractive (Novice, Attractive)');
    expect(names.get(2).getText()).toEqual('Background Brave (Novice, Spirit d6)');
  });

});