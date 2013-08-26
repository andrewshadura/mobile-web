/* Models */
var Bike = require('models/bike');

/* Collections */
var BikeList = require('models/bikeList');

/* Views */
var BasePanelView = require('views/basePanel');
var LoginView = require('views/login');
var BikesNearbyView = require('views/bikesNearby');

/* Application controller */
var AppController = Backbone.View.extend({
	el: $('#content'),

	logged: false,
	userPosition: false,

	initialize: function(options) {

	},
	renderLogin: function() {
		var view = new LoginView({app: this});
		this.$el.append(view.render().el);
		$.ui.loadContent('#'+view.id, true, false, 'none');
	},
	renderBikesNearby: function() {
		var that = this;
		this.geolocate(function() {
			var view = new BikesNearbyView({app: that});
			if(that.$('#'+view.id).size() > 0){
				that.$('#'+view.id).remove();
			}
			that.$el.append(view.render().el);
			$.ui.loadContent('#'+view.id, true, false, 'slide');
		});
	},

	geolocate: function(callback) {
		var that = this;
		$.ui.showMask('Lokalizuji...');

		var success = function(position) {
			console.log('Geolocated: ', position);
			that.userPosition = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			// localStorage.setItem('lastPosition', that.userPosition);
			$.ui.hideMask();
			callback(that.userPosition);
		};
		var error = function(err) {
			if(err.code == 1) {
				console.log('Geolocation error: Access is denied!');
			} else if(err.code == 2) {
				console.log('Geolocation error: Position is unavailable!');
			}
			// Prompt for address and try to geocode it to GPS
			var manualLocation = prompt('Lokalizace se nezdařila, zadej prosím tvojí adresu ručně:', '' /*localStorage.getItem('lastPosition')*/);
			geocode(manualLocation);
		};
		var geocode = function(address) {
			var geocoder = new google.maps.Geocoder();

			geocoder.geocode({
				address: address
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var bestPosition = results[0].geometry.location;
					success({
						coords: {
							latitude: bestPosition.lat(),
							longitude: bestPosition.lng()
						}
					});
				} else {
					error();
				}
			});
		};

		if(!navigator.geolocation) {
			console.error('Browser doesn\'t support geolocation.');
			error();
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}

	},

	go: function(where) {
		document.location.hash = where;
	},

	/**
	 * Handle AJAX errors for authentication and other errors
	 * @param  {XMLHttpRequest} xhr  [description]
	 * @param  {String} type [description]
	 */
	ajaxError: function(xhr, type) {
		switch (type){
			case 'parsererror':
				console.error('AJAX parse error', xhr);
				break;
			case 'error':
				console.log('AJAX error', xhr);
				if(xhr.status == 401){
					this.go('login'); // Redirec the to the login page.
				} else if(xhr.status == 403){
					this.go('denied'); // 403 -- Access denied
				}
				break;
			case 'timeout':
				console.error('AJAX timeout error', xhr);
				break;
		}
	}

});

exports = AppController;