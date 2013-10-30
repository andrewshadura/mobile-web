var BikesNearbyView = BasePanelView.extend({
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

	staticMapLink: function(position, bikes) {
		if(!position) return false;

		var url = 'http://maps.googleapis.com/maps/api/staticmap';
		var markers = 'size:mid';

		// Google Static Maps API URL options
		var options = {
			key: 'AIzaSyCWUjiJIxtc8IGKGIFXaANqKXPaAup9DsI',
			sensor: true,
			visual_refresh: true,
			size: $('#app').width() + 'x300',
			markers: 'color:blue|' + position,
			scale: 2,
			format: 'jpg'
		};

		// Assumption that bikes are sorted by distance from current position
		var count = Math.min(bikes.length, 5); // Show max 5 bikes on map
		for (var i = 0; i < count; i++) {
			var bike = bikes[i];
			markers += '|' + bike.location.lat + ',' + bike.location.lng;
		}

		// Construct final url with all options properly encoded
		return url + '?' + $.param(options) + '&' + $.param({markers: markers});
	},

	render: function() {
		console.log('BikesNearbyView render');

		var position = this.options.app.userPosition ? (this.options.app.userPosition.lat + ',' + this.options.app.userPosition.lng) : false;
		var bikes = this.model.toJSON();

		this.$el.html(this.template({
			position: position,
			bikes: bikes,
			gmapsStaticUrl: this.staticMapLink(position, bikes)
		}));

		return this;
	},

	bikeDetail: function(e) {
		e.preventDefault();
		this.options.app.go('bike/' + $(e.currentTarget).data('id'));
	}

});
