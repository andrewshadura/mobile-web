var Bike = Backbone.Model.extend({

	url: function() {
		return '/bikes/' + this.id;
	},

	defaults: function() {
		return {
			/*id: 0,*/
			name: '',
			description: '',
			issues: [],
			operational: true,
			location: {
				address: 'Mars',
				distance: null,
				lat: null,
				lng: null,
				note: '',
				type: ''
			},
			// rented: false,
		};
	},

	rent: function(bikeCode, unlockCode) {
		this.set({
			bikeCode: bikeCode,
			lockCode: unlockCode,
			// rented: true
		});
		localStorage.setItem(REKOLA.rentedBike, JSON.stringify(this.toJSON()));
	},

	returnBack: function(note) {
		this.set({
			note: note,
			// rented: false
		});
		localStorage.removeItem(REKOLA.rentedBike);
	},

});
