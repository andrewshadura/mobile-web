var Bike = Backbone.Model.extend({

	url: function() {
		return '/bikes/' + this.id;
	},

	defaults: function() {
		return {
			/*id: 0,*/
			description: '',
			issue: '',
			location: {
				address: 'Mars',
				distance: null,
				lat: null,
				lng: null,
				note: '',
				type: ''
			},
			status: '',

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

	return: function(note) {
		this.set({
			note: note,
			rented: false
		});
		localStorage.removeItem(REKOLA.rentedBike);
	},

});
