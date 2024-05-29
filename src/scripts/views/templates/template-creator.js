import CONFIG from '../../globals/config';

const createDetailrestaurant = (restaurant) => `
<div id="contentdetail" class="contentdetail">
<img class="image_detail" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
<div class="restaurant_info_detail">
        <h2 class="detail_title">${restaurant.name}</h2>
    <div class="info_list">
        <h4>City</h4>
        <p class="info_city">${restaurant.city}<p>
        <h4>Address</h4>
        <p class="info_address">${restaurant.address}<p>
        <h4>Rating</h4>
        <p class="info_rate">${restaurant.rating}<p>
        <h4>Description</h4>
        <p class="info_desc">${restaurant.description}</p>
    </div>
    <h2 class="detail_title">Menu</h2>
    <div class="restaurant_menu">
        <div class="foods_detail">
        <h2 class="menu_title">Foods</h2>
        <ul>
            ${restaurant.menus.foods.map((food) => `<li class="list">${food.name}</li>`).join('')}
        </ul>
        </div>
        <div class="drinks_detail">
        <h2 class="menu_title">Drinks</h2>
        <ul>
            ${restaurant.menus.drinks.map((drink) => `<li class="list">${drink.name}</li>`).join('')}</p>
        </ul>
        </div>
    </div>
    <div class="restaurant_review">
        <h3 class="review_header">Review</h3>
        <div class="review_item">
        ${restaurant.customerReviews.map((reviewer) => `
            <h4>${reviewer.name} - ${reviewer.date}</h4>
            <p>${reviewer.review}</p>`).slice(0, 3)}
        </div>
    </div>
</div>
</div>
`;
const createItemrestaurant = (restaurant) => `
    <div class="contentlist" id="list">
        <a href="/#/detail/${restaurant.id}">
        <img class="image" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
            <div class="restaurant_info">
                <h2 class="info_title">${restaurant.name}</h2>
                <p class="info_city">${restaurant.city}<p>
                <p class="info_desc">${restaurant.description.slice(0, 225)}</p>
                <p class="info_rates">Rating: ${restaurant.rating}<p>
            </div>
        </a>
    </div>
`;

const createLikeButtonTemplate = () => `
    <button aria-label="like this restaurant" id="likeButton" class="like">
       <i class="fa fa-heart-o" aria-hidden="true"></i>
    </button>
  `;

const createLikedButtonTemplate = () => `
    <button aria-label="unlike this restaurant" id="likeButton" class="like">
      <i class="fa fa-heart" aria-hidden="true"></i>
    </button>
  `;

export {
  createDetailrestaurant,
  createItemrestaurant,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
