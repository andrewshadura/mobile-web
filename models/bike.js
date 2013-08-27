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
			rented: false,
		};
	},

	rent: function(bikeCode, unlockCode) {
		this.set({
			bikeCode: bikeCode,
			unlockCode: unlockCode,
			rented: true
		});
		localStorage.setItem(REKOLA.rentedBike, JSON.stringify(this.toJSON()));
	},

	return: function(bikePosition, note) {
		this.set({
			address: bikePosition,
			note: note,
			rented: false
		});
		localStorage.removeItem(REKOLA.rentedBike);
	},

});

exports = Bike;