var BikeList = Backbone.Collection.extend({
	model: Bike,
	url: REKOLA.remoteUrl + '/bikes',

	parse: function(response) {
		console.log('parse:', response);
		return response;
	}
});
