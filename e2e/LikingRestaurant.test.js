const assert = require('assert');

const emptycondition = "You don't have any Favorite Restaurant";
Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('.favorite');
  I.see(emptycondition, '.empty_favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');
  I.see(emptycondition, '.empty_favorite');

  I.amOnPage('/');

  I.waitForElement('.contentlist a', 5);
  I.seeElement('.contentlist a');
  const cardrestaurant = locate('.info_title').first();
  const firstcardrestaurant = await I.grabTextFrom(cardrestaurant);
  I.click(cardrestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.contentlist');
  const likedcardrestaurant = await I.grabTextFrom('.info_title');
  assert.strictEqual(firstcardrestaurant, likedcardrestaurant);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.amOnPage('/#/favorite');
  I.see(emptycondition, '.empty_favorite');
  I.amOnPage('/');

  I.waitForElement('.contentlist a', 5);
  I.seeElement('.contentlist a');
  const cardrestaurant = locate('.info_title').first();
  const firstcardrestaurant = await I.grabTextFrom(cardrestaurant);
  I.click(cardrestaurant);

  I.waitForElement('#likeButton');
  I.retry(3).seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.contentlist');
  const likedcardrestaurant = await I.grabTextFrom('.info_title');
  assert.strictEqual(firstcardrestaurant, likedcardrestaurant);

  I.click(likedcardrestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see(emptycondition, '.empty_favorite');
});
