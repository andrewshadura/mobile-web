var BasePanelView = require('views/basePanel');

var BikeDetailView = BasePanelView.extend({
	attributes: {
		'data-title': 'Kolo'
	},
	id: 'bikeDetail',

	template: _.template($('#template-bikedetail').html()),

	events: {
		'click .button-getcode': 'goGetcode'
	},

	initialize: function(options) {
		console.log('BikeDetailView init', options);
		this.$el.data('title', this.model.get('name'));
	},

	goGetcode: function(e) {
		this.options.app.go('bike/' + this.model.get('id') + '/getcode');
		return false;
	},

	initMap: function() {
		var mapEl = this.$('.map').get(0);
		var loc = this.model.get('location');
		var position = new google.maps.LatLng(loc.lat, loc.lng);

		var gmap = new google.maps.Map(mapEl, {
			center: position,
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: false,
			disableDefaultUI: true
		});
		var marker = new google.maps.Marker({
			position: position,
			// icon: ...,
			map: gmap
		});
		// Trigger repaint on map because of render delay
		setTimeout(function() {
			google.maps.event.trigger(gmap, 'resize');
			gmap.setCenter(position);
		}, 250);
	},

	render: function() {
		console.log('BikeDetailView render');
		this.$el.html(this.template({
			bike: this.model.toJSON()
		}));
		this.initMap();

		return this;
	},
});

exports = BikeDetailView;
