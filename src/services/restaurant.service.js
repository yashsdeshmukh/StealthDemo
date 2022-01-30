const { Restaurant } = require('../model');
const IP_API_URL = 'http://ip-api.com/json/';

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAPS_API_KEY,
    Promise
});


const getRestaurantByLocation = async() => {

};

//done
const createRestaurant = async(restaurantBody) => {
    return Restaurant.create(restaurantBody);
};

//done
const updateRating = async(restaurantId, updateBody) => {
  console.log(" UPDATE RATING "+ restaurantId)
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new Error('Restaurant not found');
  }
  Object.assign(restaurant, updateBody);
  await restaurant.save();
  return restaurant;
};

module.exports = {
    getRestaurantByLocation,
    createRestaurant,
    updateRating
}