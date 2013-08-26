var BasePanelView = require('views/basePanel');

var BikesNearbyView = BasePanelView.extend({
	attributes: {
		title: 'Kola okolo'
	},
	id: 'bikesNearby',

	template: _.template($('#template-bikesnearby').html()),

	events: {
		'click .bikeDetail': 'bikeDetail'
	},

	initialize: function(options) {
		console.log('BikesNearbyView init', options);
		this.listenTo(this.model, 'all', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function() {
		console.log('BikesNearbyView render');
		this.$el.html(this.template({
			myPosition: this.options.app.userPosition.lat + ', ' + this.options.app.userPosition.lng,
			bikes: this.model.toJSON()
		}));
		return this;
	},

	bikeDetail: function(e) {
		this.options.app.go('bike/' + $(e.target).data('id'));
		return false;
	}

});

exports = BikesNearbyView;