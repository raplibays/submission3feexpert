import API_ENDPOINT from '../globals/api-endpoint';

class DaftarRestaurantSource {
  static async ListRestaurants() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default DaftarRestaurantSource;
