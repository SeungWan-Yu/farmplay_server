var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/tourinfo.controller')

const controllerfood = require('../../controller/v1/food.controller')

const controllerlodgment = require('../../controller/v1/lodgment.controller')

const controllerattractions = require('../../controller/v1/attractions.controller')

const controllerculture = require('../../controller/v1/culture.controller')

const controllershopping = require('../../controller/v1/shopping.controller')

router.route('/food')
.get(controllerfood.get)

router.route('/lodgment')
.get(controllerlodgment.get)

router.route('/attractions')
.get(controllerattractions.get)

router.route('/culture')
.get(controllerculture.get)

router.route('/shopping')
.get(controllershopping.get)

router.route('/')
.post(controller.post)

module.exports = router;
