import DaftarRestaurantSource from '../../data/daftarrestaurant-source';
import { createItemrestaurant } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <div class="label">
    <h1 class="explore_label"> All Warteg</h1>
    </div> 
    <div id="content" class="content"></div>
        `;
  },

  async afterRender() {
    const restaurants = await DaftarRestaurantSource.ListRestaurants();
    const restaurantsContainer = document.querySelector('#content');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createItemrestaurant(restaurant);
    });
  },

};
export default Home;
