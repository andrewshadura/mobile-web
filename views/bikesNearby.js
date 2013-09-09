var BikesNearbyView = BasePanelView.extend({
	attributes: {
		'data-title': 'Kola okolo'
	},
	id: 'bikesNearby',

	template: _.template($('#template-bikesnearby').html()),

	events: {
		'click .bikeDetail': 'bikeDetail'
	},

	initialize: function(options) {
		console.log('BikesNearbyView init', options);
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function() {
		console.log('BikesNearbyView render');
		this.$el.html(this.template({
			position: this.options.app.userPosition ? this.options.app.userPosition.lat + ', ' + this.options.app.userPosition.lng : false,
			bikes: this.model.toJSON()
		}));
		return this;
	},

	bikeDetail: function(e) {
		this.options.app.go('bike/' + $(e.currentTarget).data('id'));
		return false;
	}

});
