var Bike = Backbone.Model.extend({

	url: function() {
		return '/bikes/' + this.id;
	},

	defaults: function() {
		return {
			/*id: 0,*/
			position: { lat: null, lng: null},
			address: 'Ulice, č.p., Město',
			positionNote: '',
			type: 'old',
			state: 'free',
		}
	},

	rent: function(bikeCode, unlockCode) {
		this.set({
			bikeCode: bikeCode,
			unlockCode: unlockCode,
			rented: true
		});
		localStorage.setItem(REKOLA.rentedBike, JSON.stringify(this.toJSON()));
	},

	putBack: function(bikePosition, note) {
		// ...
	},

});

exports = Bike;