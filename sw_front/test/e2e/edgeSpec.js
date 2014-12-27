describe('Edges Application', function () {

  it('Homepage', function() {
    browser.get('http://localhost:9000');
    expect(browser.getTitle()).toEqual('Savage Worlds Database');
  })

});