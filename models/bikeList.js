var Bike = require('models/bike');

var BikeList = Backbone.Collection.extend({
	model: Bike
});

exports = BikeList;