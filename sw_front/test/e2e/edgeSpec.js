describe('Edges Application', function () {

  beforeEach(function() {
    browser.get('http://localhost:9000');
  });

  it('Homepage has a title', function() {
    expect(browser.getTitle()).toEqual('Savage Worlds Database');
  });

  it('Homepage displays a welcome message', function() {
    var welcomeEl = element(by.css('.jumbotron'));
    expect(welcomeEl.getText()).toContain('Welcome to Savage Worlds!');
  });

});