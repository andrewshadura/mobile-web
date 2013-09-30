var BikeCodeView = BasePanelView.extend({
	id: 'bikeCode',

	template: _.template($('#template-bikecode').html()),

	events: {
		'click .button-getcode': 'getCode',
		'submit form': 'getCode'
	},

	initialize: function(options) {
		console.log('BikeCodeView init', options);

	},

	getCode: function(e) {
		var that = this;
		var bikeCode = this.$('.code').val();

		$.ui.showMask('Získávám kód zámku...');

		this.options.app.onGeolocation(function(pos) {
			that.options.app.ajax({
				url: REKOLA.remoteUrl + '/bikes/lock-code',
				data: {
					bikeCode: bikeCode,
					lat: pos.lat,
					lng: pos.lng
				},

				success: function(result) {
					var bike = new Bike(result.bike);
					bike.rent(bikeCode, result.lockCode);
					that.options.app.addBike(bike);
					that.options.app.go('bike/' + bike.id + '/rented');
				},
				complete: function() {
					$.ui.hideMask();
				}
			});
		});

		return false;
	},

	render: function() {
		console.log('BikeCodeView render');
		this.$el.html(this.template());
		return this;
	},
});
