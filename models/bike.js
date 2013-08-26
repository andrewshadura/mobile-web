var Bike = Backbone.Model.extend({

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

	borrow: function(bikeCode) {
		this.state = 'mine';
		// ...
		return this._getUnlockCode(bikeCode);
	},

	putBack: function(bikePosition, note) {
		// ...
	},

	_getUnlockCode: function(bikeCode) {
		// ...
		return '12345'
	}

});

exports = Bike;