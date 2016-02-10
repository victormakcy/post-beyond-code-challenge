describe('post beyond code challenge', function() {
  it('bookmarks home page should have a nav-bar with an add bookmark button', function() {
    browser.get('http://localhost:3000');

    expect(element(by.className('js-nav-bar')).isPresent()).toBe(true);
    expect(element(by.className('js-add-bookmarks-button')).isPresent()).toBe(true);
  });

  it('clicking an article card should open a new page with the title of the same article', function() {
    browser.get('http://localhost:3000');

    var bookmarks = element.all(by.repeater('bookmark in bookmarks'));
    var articleCardTitle = bookmarks.get(0).element(by.className('js-article-card__title')).getText();

    bookmarks.get(0).click();

    expect(element(by.className('js-article__title')).isPresent()).toBe(true);
    expect(element(by.className('js-article__title')).getText()).toEqual(articleCardTitle);
  });
});
