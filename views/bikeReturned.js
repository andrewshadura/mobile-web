var BasePanelView = require('views/basePanel');

var BikeReturnedView = BasePanelView.extend({
	attributes: {
		title: 'Úspěšně vráceo'
	},
	id: 'bikeReturned',

	template: _.template($('#template-bikereturned').html()),

	events: {
		'click .button-nearby': 'goNearby'
	},

	initialize: function(options) {
		console.log('BikeReturnedView init', options);
	},

	goNearby: function() {
		this.options.app.go('nearby');
	},

	render: function() {
		console.log('BikeReturnedView render');
		this.$el.html(this.template());
		return this;
	},
});

exports = BikeReturnedView;