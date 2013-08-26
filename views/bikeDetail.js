var BasePanelView = require('views/basePanel');

var BikeDetailView = BasePanelView.extend({
	attributes: {
		title: function() {
			return 'Kolo' + this.model.id;
		}
	},
	id: 'bikeDetail',

	template: _.template($('#template-bikedetail').html()),

	initialize: function(options) {
		console.log('BikeDetailView init', options);
	},

	render: function() {
		console.log('BikeDetailView render');
		this.$el.html(this.template({
			bike: this.model.toJSON()
		}));
		return this;
	},
});

exports = BikeDetailView;