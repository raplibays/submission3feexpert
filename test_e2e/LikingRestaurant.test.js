const assert = require('assert');

const emptyCondition = "You don't have any Favorite Restaurant";

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(emptyCondition, '.empty_favorite');
  I.amOnPage('/');
  I.waitForElement('.contentlist a', 5);
  I.seeElement('.contentlist a');

  const restaurantCard = locate('.info_title').first();
  const firstRestaurantName = await I.grabTextFrom(restaurantCard);

  I.click(restaurantCard);
  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.contentlist');
  const likedRestaurantName = await I.grabTextFrom('.info_title');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see(emptyCondition, '.empty_favorite');
  I.amOnPage('/');
  I.waitForElement('.contentlist a', 5);
  I.seeElement('.contentlist a');

  const restaurantCard = locate('.info_title').first();
  const firstRestaurantName = await I.grabTextFrom(restaurantCard);

  I.click(restaurantCard);
  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.contentlist');
  const likedRestaurantName = await I.grabTextFrom('.info_title');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.click(likedRestaurantName);
  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.empty_favorite');
  const emptyMessage = await I.grabTextFrom('.empty_favorite');

  assert.strictEqual(emptyMessage, emptyCondition);
});
