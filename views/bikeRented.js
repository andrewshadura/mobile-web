var BikeRentedView = BasePanelView.extend({
	id: 'bikeRented',

	template: _.template($('#template-bikerented').html()),

	events: {
		'click .button-return': 'returnBike'
	},

	initialize: function(options) {
		console.log('BikeRentedView init', options);
	},

	returnBike: function() {
		this.options.app.go('bike/' + this.model.get('id') + '/return');
	},

	render: function() {
		console.log('BikeRentedView render');
		this.$el.html(this.template({
			bike: this.model.toJSON()
		}));
		return this;
	},
});
