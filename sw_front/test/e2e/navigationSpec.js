'use strict';

// TODO Introduce navigation_page, and expose logout link so it can be reused by other tests
describe('Navigation Menu', function () {

  beforeEach(function () {
    browser.get('/');
  });

  var verifyActiveLink = function(expectedLinkText) {
    var activeEl = element(by.css('.active'));
    expect(activeEl.getText()).toEqual(expectedLinkText);
  };

  it('Home link is active by default', function () {
    verifyActiveLink('Home');
  });

  it('Displays navigation items', function() {
    var navItems = element.all(by.css('.nav li'));
    expect(navItems.get(0).getText()).toEqual('Home');
    expect(navItems.get(1).getText()).toEqual('Edges');
  });

  it('Changes active link when navigation item is selected', function() {
    var navItems = element.all(by.css('.nav li'));
    var edgesNavItem = navItems.get(1);
    var homeNavItem = navItems.get(0);

    edgesNavItem.click();
    verifyActiveLink('Edges');

    homeNavItem.click();
    verifyActiveLink('Home');
  });
});