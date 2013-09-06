var BasePanelView = require('views/basePanel');

var BikeReturnView = BasePanelView.extend({
	attributes: {
		'data-title': 'Vrátit kolo'
	},
	id: 'bikeReturn',

	template: _.template($('#template-bikereturn').html()),

	events: {
		'click .button-return': 'doReturn',
		'submit form': 'doReturn'
	},

	initialize: function(options) {
		console.log('BikeReturnView init', options);
	},

	initMap: function() {
		var that = this;
		var mapWrap = this.$('.mapWrap');
		var mapEl = mapWrap.find('.map').get(0);

		this.options.app.geolocate(function(loc) {
			var position = new google.maps.LatLng(loc.lat, loc.lng);
			savePosition(position);

			var gmap = new google.maps.Map(mapEl, {
				center: position,
				zoom: 17,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: false,
				disableDefaultUI: true
			});
			// Set bike position on map move
			google.maps.event.addListener(gmap, 'bounds_changed', function(){
				savePosition(gmap.getCenter());
			});
			// Trigger repaint on map because of render delay
			setTimeout(function() {
				google.maps.event.trigger(gmap, 'resize');
				gmap.setCenter(position);
				//mapWrap.css('height', mapWrap.height() + 'px'); // @TODO Fix map height
			}, 250);
		});

		var savePosition = function(LatLng){
			that.model.set({
				location: {
					lat: LatLng.lat(),
					lng: LatLng.lng()
				}
			});
		};
	},

	doReturn: function(e) {
		var that = this;
		var id = this.model.get('id');
		var loc = this.model.get('location');
		var note = this.$('textarea').val();

		$.ui.showMask('Vracím kolo...');
		this.options.app.ajax({
			type: 'PUT',
			url: REKOLA.remoteUrl + '/bikes/' + id + '/return',
			data: JSON.stringify({
				location: {
					lat: loc.lat,
					lng: loc.lng,
					note: note
				}
			}),
			success: function() {
				that.model.return(note);
				console.log('Returned bike:', that.model.toJSON());
				that.options.app.go('/bike/' + id + '/returned');
			},
			complete: function() {
				$.ui.hideMask();
			}
		});
	},

	render: function() {
		console.log('BikeReturnView render');
		this.$el.html(this.template({
			bike: this.model.toJSON()
		}));
		this.initMap();

		return this;
	}

});

exports = BikeReturnView;
