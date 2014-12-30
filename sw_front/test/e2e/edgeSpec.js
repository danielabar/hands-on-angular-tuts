'use strict';

describe('Edges Page', function() {

  var EXPECTED_NUM_EDGES = 7;

  beforeEach(function () {
    browser.get('/#/edges');
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

    var names = element.all(by.binding('edge.name'));
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
    var firstEdge = element.all(by.css('li.e2e-edge')).get(0);
    firstEdge.click();

    expect(descriptions.get(0).isDisplayed()).toBeTruthy();
    expect(descriptions.get(0).getText()).toContain('beautiful people');

    firstEdge.click();
    expect(descriptions.get(0).isDisplayed()).toBeFalsy();
  });

  it('Displays category options', function() {
    var categoryOptions = element.all(by.options('c.name for c in categories'));
    expect(categoryOptions.count()).toEqual(4);
    expect(categoryOptions.get(0).getText()).toBe('All');
    expect(categoryOptions.get(1).getText()).toBe('Background');
    expect(categoryOptions.get(2).getText()).toBe('Combat');
    expect(categoryOptions.get(3).getText()).toBe('Leadership');
  });

  it('Displays rank options', function() {
    var rankOptions = element.all(by.options('r.name for r in ranks'));
    expect(rankOptions.count()).toEqual(3);
    expect(rankOptions.get(0).getText()).toBe('All');
    expect(rankOptions.get(1).getText()).toBe('Novice');
    expect(rankOptions.get(2).getText()).toBe('Seasoned');
  });

  it('Selecting a category option filters the results by that category', function() {
    element(by.cssContainingText('option', 'Background')).click();

    var names = element.all(by.binding('edge.name'));
    expect(names.count()).toEqual(3);
    expect(names.get(0).getText()).toEqual('Background Attractive (Novice, Vigor d6)');
    expect(names.get(1).getText()).toEqual('Background Very Attractive (Novice, Attractive)');
    expect(names.get(2).getText()).toEqual('Background Brave (Novice, Spirit d6)');

  });

});