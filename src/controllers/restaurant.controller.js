const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');

const nearby = catchAsync(async (req, res) => {
    let myOldJSON;
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'http://ip-api.com/json/',
        'headers': {
    }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        myOldJSON = JSON.parse(response.body);
    });

    let lati = myOldJSON.lat;
    let long = myOldJSON.lon;
    console.log(myOldJSON.lat)
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=${myOldJSON.lat}%2C${myOldJSON.lon}&radius=1500&type=restaurant&key=YOUR_API_KEY`,
        'headers': {
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    const myJSON = JSON.parse(response.body);
    let restaurantNames = [];
    const store = myJSON.results;
    myJSON.results.map((item,index)=>(restaurantNames.push(item.name)))
    res.send(restaurantNames);
  });
    
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
}