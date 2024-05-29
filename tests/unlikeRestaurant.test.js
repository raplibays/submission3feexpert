import RestaurantFavoriteIdb from '../src/scripts/data/restaurant-favorite-idb';
import * as testRestaurant from './helpers/testRestaurant';

describe('Unliking A Restaurant', () => {
  const createLikeButtonContainer = () => {
    const likeButtonContainer = document.createElement('div');
    likeButtonContainer.id = 'likeButtonContainer';
    document.body.appendChild(likeButtonContainer);
  };

  beforeEach(async () => {
    createLikeButtonContainer();
    await RestaurantFavoriteIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await RestaurantFavoriteIdb.deleteRestaurant(1);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await testRestaurant.createLikeButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await testRestaurant.createLikeButtonPresenterWithRestaurant({ id: 1 });
    expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await testRestaurant.createLikeButtonPresenterWithRestaurant({ id: 1 });
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    expect(await RestaurantFavoriteIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await testRestaurant.createLikeButtonPresenterWithRestaurant({ id: 1 });
    await RestaurantFavoriteIdb.deleteRestaurant(1);
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));
    expect(await RestaurantFavoriteIdb.getAllRestaurants()).toEqual([]);
  });
});
