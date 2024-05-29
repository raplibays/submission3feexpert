import RestaurantFavoriteIdb from '../src/scripts/data/restaurant-favorite-idb';
import * as testRestaurant from './helpers/testRestaurant';
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await testRestaurant.createLikeButtonPresenterWithRestaurant({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]'))
      .toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await testRestaurant.createLikeButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await testRestaurant.createLikeButtonPresenterWithRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurants = await RestaurantFavoriteIdb.getRestaurant(1);
    expect(restaurants).toEqual({ id: 1 });
    RestaurantFavoriteIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await testRestaurant.createLikeButtonPresenterWithRestaurant({ id: 1 });
    await RestaurantFavoriteIdb.putRestaurant({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await RestaurantFavoriteIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
    RestaurantFavoriteIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await testRestaurant.createLikeButtonPresenterWithRestaurant({});
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await RestaurantFavoriteIdb.getAllRestaurants()).toEqual([]);
  });
});
