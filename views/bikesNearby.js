var BasePanelView = require('views/basePanel');

var BikesNearbyView = BasePanelView.extend({
	attributes: {
		title: 'Kola okolo'
	},
	id: 'bikesNearby',

	template: _.template($('#template-bikesnearby').html()),

	render: function() {
		this.$el.html(this.template({
			myPosition: this.options.app.userPosition.lat + ', ' + this.options.app.userPosition.lng
		}));
		return this;
	}

});

exports = BikesNearbyView;