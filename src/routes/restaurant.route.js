const express = require('express');
const validate = require('../middlewares/validate');
const restaurantValidation = require('../validations/restaurant.validation');
const restaurantController = require('../controllers/restaurant.controller');

const router = express.Router();

/*
Discovery
*/
router.get('/nearby/:radius', validate(restaurantValidation.nearby), restaurantController.nearby);
router.get('/all', validate(restaurantValidation.all), restaurantController.all);

/*
ratings
*/
router.post('/new_rating', validate(restaurantValidation.new_rating), restaurantController.new_rating);
router.patch('/update_rating/:id', validate(restaurantValidation.update_rating), restaurantController.update_rating);
// router.get('/avg_rating', validate(restaurantValidation.all), restaurantController.all);

module.exports = router;