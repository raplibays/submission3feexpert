import RestaurantFavoriteIdb from '../../data/restaurant-favorite-idb';
import { createItemrestaurant } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <div class="favorite">
        <h1 class="favoritehead">Restaurant Favorite</h1>
        <div id="empty_favorite" class="empty_favorite"></div>
    </div>  
        <div id="content" class="content"></div>
        `;
  },
  async afterRender() {
    const restaurants = await RestaurantFavoriteIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#content');
    const emptyrestaurant = document.querySelector('#empty_favorite');
    if (restaurants.length === 0) {
      emptyrestaurant.innerHTML = `
        You don't have any Favorite Restaurant
      `;
    }
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createItemrestaurant(restaurant);
    });
  },

};
export default Favorite;
