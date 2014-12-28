describe('Home Page', function () {

  beforeEach(function() {
    // browser.get('http://localhost:9000');
    browser.get('/');
  });

  it('Has a title', function() {
    expect(browser.getTitle()).toEqual('Savage Worlds Database');
  });

  it('Displays a welcome message', function() {
    var welcomeEl = element(by.css('.jumbotron'));
    expect(welcomeEl.getText()).toContain('Welcome to Savage Worlds!');
  });

});