var BasePanelView = require('views/basePanel');

var BikeRentedView = BasePanelView.extend({
	attributes: {
		'data-title': 'Tak jedem!'
	},
	id: 'bikeRented',

	template: _.template($('#template-bikerented').html()),

	events: {
		'click .button-return': 'returnBike'
	},

	initialize: function(options) {
		console.log('BikeRentedView init', options);
	},

	returnBike: function() {
		// this.model.return(prompt('Zadejte adresu, kde jste kolo nechali'), prompt('Teď zadejte bližší popis místa'));
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

exports = BikeRentedView;