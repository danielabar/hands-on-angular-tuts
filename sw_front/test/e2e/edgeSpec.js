'use strict';

describe('Edges Page', function() {

  beforeEach(function () {
    browser.get('/#/edges');
  });

  it('Displays a list of edges', function() {
    var categories = element.all(by.binding('edge.category.name'));
    expect(categories.count()).toEqual(2);
    expect(categories.get(0).getText()).toEqual('Background');
    expect(categories.get(1).getText()).toEqual('Background');

    var names = element.all(by.binding('edge.name'));
    expect(names.count()).toEqual(2);
    expect(names.get(0).getText()).toEqual('Background Attractive (Novice, Vigor d6)');
    expect(names.get(1).getText()).toEqual('Background Strong (Novice, Vigor d8)');
  });

  it('Descriptions are hidden', function() {
    var descriptions = element.all(by.binding('edge.description'));
    expect(descriptions.count()).toEqual(2);
    expect(descriptions.get(0).isDisplayed()).toBeFalsy();
    expect(descriptions.get(1).isDisplayed()).toBeFalsy();
    // descriptions.each(function(desc) {
    //   expect(desc.isDisplayed()).toBeFalsy();
    // });
  });

});