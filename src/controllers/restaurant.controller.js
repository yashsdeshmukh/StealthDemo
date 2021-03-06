const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');
const { Restaurant } = require('../model');
const config = require('../config/config');
const nearby = catchAsync(async (req, res) => {
    var radius = req.params.radius
    /*
    Request to get Lat and longitude
    */
    let myOldJSON;
    var lati;
    var long;
    var request1 = require('request');
    var options1 = {
        'method': 'GET',
        'url': 'http://ip-api.com/json/',
        'headers': {
    }
    };
    request1(options1, function (error, response1) {
        if (error) throw new Error(error);
        myOldJSON = JSON.parse(response1.body);
        //console.log(myOldJSON.lat)
        //console.log(myOldJSON.lon)
        
        lati = myOldJSON.lat
        console.log(typeof lati)
        long = myOldJSON.lon
        console.log(lati + " ---- " + long)
        
        //console.log("FINAL TEST - " + restaurant);
        
    });

    /*
    Request to get Nearby restaurants
    */
    setTimeout(() => {
        console.log(lati + " ---- " + long)
    var request = require('request');
    var options = {
    'method': 'GET',
    'url': `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=${lati}%2C${long}&radius=${radius}&type=restaurant&key=${config.maps.maps_key}`,
    'headers': {
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body)
    const myJSON = JSON.parse(response.body);
    let restaurantNames = [];
    const store = myJSON.results;
    myJSON.results.map((item,index)=>(restaurantNames.push(item.name)))
    res.send(restaurantNames);
    });
    }, 1000);

    
    
    
});

const nearbyRating = catchAsync(async (req, res) => {
    var radius = req.params.radius
    /*
    Request to get Lat and longitude
    */
    let myOldJSON;
    var lati;
    var long;
    var request1 = require('request');
    var options1 = {
        'method': 'GET',
        'url': 'http://ip-api.com/json/',
        'headers': {
    }
    };
    request1(options1, function (error, response1) {
        if (error) throw new Error(error);
        myOldJSON = JSON.parse(response1.body);
        //console.log(myOldJSON.lat)
        //console.log(myOldJSON.lon)
        
        lati = myOldJSON.lat
        console.log(typeof lati)
        long = myOldJSON.lon
        console.log(lati + " ---- " + long)
        
        //console.log("FINAL TEST - " + restaurant);
        
    });

    /*
    Request to get Nearby restaurants
    */
    setTimeout(() => {
        console.log(lati + " ---- " + long)
    var request = require('request');
    var options = {
    'method': 'GET',
    'url': `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=${lati}%2C${long}&radius=${radius}&type=restaurant&key=${config.maps.maps_key}`,
    'headers': {
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body)
    const myJSON = JSON.parse(response.body);
    let restaurantList = [];
    const map1 = new Map();
    const store = myJSON.results;
    myJSON.results.map((item,index)=>(map1.set(item.name,item.rating)))
    console.log(map1.get('CONCH RESTAURANTS'))
    //console.log(map1.keys);
    for (const role of map1.entries()) {
        let restaurant = new Restaurant();
        // console.log(`${role[0]}: ${role[1]}`);
        restaurant.name = role[0];
        restaurant.rating = role[1];
        restaurantList.push(restaurant)
    }
    console.log(map1.entries())
    res.send(restaurantList);
    });
    }, 1000);
});

const getByName = catchAsync(async (req, res) => {
    const restaurant = await restaurantService.getRestaurantByName(req.params.name);
    if (!restaurant) {
        throw new Error('Restaurants not found');
    }
    res.send(restaurant);
});

const all = catchAsync(async (req, res) => {
    const restaurant = await restaurantService.getAllRestaurants();
    if (!restaurant) {
        throw new Error('Restaurants not found');
    }
    res.send(restaurant);
});

const new_rating = catchAsync(async (req, res) => {
    const restaurant = await restaurantService.createRestaurant(req.body);
    res.status(httpStatus.CREATED).send(restaurant);
});

const update_rating = catchAsync(async (req, res) => {
    console.log(req.params);
    const restaurant = await restaurantService.updateRating(req.params.id, req.body);
    res.status(httpStatus.OK).send(restaurant);
});

module.exports = {
    nearby,
    new_rating,
    update_rating,
    all,
    getByName,
    nearbyRating
}