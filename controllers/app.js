/* Application controller */
var AppController = Backbone.View.extend({
	el: $('#afui'),

	logged: false,
	apiKey: '',
	userPosition: false,

	events: {
		'click .button-go': function(e) {
			e.preventDefault();
			this.go($(e.currentTarget).data('go'));
		}
	},

	initialize: function(options) {
		console.log('AppController init', options);
		this.bikes = new BikeList();
		this.$content = this.$('#content');
		this.geolocate();
	},

	renderSubview: function(view, animation) {
		this.$('#'+view.id).remove(); // remove old element
		this.$content.append(view.render().el); // place a new one
		$.ui.loadContent('#'+view.id, true, false, animation ? animation : 'slide'); // navigate UI to this panel
	},

	renderLogin: function() {
		var view = new LoginView({app: this});
		this.renderSubview(view, 'none');
	},

	checkForRentedBike: function() {
		var that = this;

		this.ajax({
			url: REKOLA.remoteUrl + '/bikes/mine',
			success: function(result) {
				var rented = new Bike(result);
				that.addBike(rented);
				localStorage.setItem(REKOLA.rentedBike, JSON.stringify(rented.toJSON()));
				that.go('bike/' + rented.id + '/rented');
			},
			error: function(xhr) {
				if(xhr.status == 404){
					localStorage.removeItem(REKOLA.rentedBike);
				}
			}
		});
	},

	renderBikesNearby: function() {
		var that = this;

		this.checkForRentedBike();

		// View instance
		var view = new BikesNearbyView({
			app: this,
			model: this.bikes
		});
		this.renderSubview(view);
		// Locate user to get nearby bikes from API
		this.onGeolocation(function(pos) {

			$.ui.showMask('Načítám kola poblíž...');
			that.ajax({
				url: REKOLA.remoteUrl + '/bikes',
				data: {
					lat: pos.lat,
					lng: pos.lng
				},
				success: function(result) {
					_.each(result, function(bikeData) {
						that.addBike(new Bike(bikeData));
					});
					view.render();
					var iscroll = new IScroll('#' + view.id);
				},
				complete: function() {
					$.ui.hideMask();
				}
			});

		});
	},
	renderBikeDetail: function(id) {
		var bike = this.bikes.get(id);
		var view = new BikeDetailView({
			app: this,
			model: bike
		});
		this.renderSubview(view);
	},
	renderBikeCode: function() {
		var view = new BikeCodeView({
			app: this
		});
		this.renderSubview(view);
	},
	renderBikeRented: function(id) {
		var bike = this.bikes.get(id);
		console.log(bike.toJSON());
		var view = new BikeRentedView({
			app: this,
			model: bike
		});
		this.renderSubview(view);
	},
	renderBikeReturn: function(id) {
		var bike = this.bikes.get(id);
		var view = new BikeReturnView({
			app: this,
			model: bike
		});
		this.renderSubview(view);
	},
	renderBikeReturned: function() {
		var view = new BikeReturnedView({
			app: this
		});
		this.renderSubview(view);
	},
	renderBikeReport: function(id) {
		var bike = this.bikes.get(id);
		var view = new BikeReportView({
			app: this,
			model: bike
		});
		this.renderSubview(view);
	},
	renderBikeIssues: function(id) {
		var that = this;
		var bike = this.bikes.get(id);
		var view = new BikeIssuesView({
			app: this,
			model: bike
		});

		$.ui.showMask('Hledám problémy...');
		that.ajax({
			url: REKOLA.remoteUrl + '/bikes/' + id + '/issues?onlyOpen=1',
			success: function(result) {
				bike.set({
					fullIssues: result
				});
				console.log(result, bike);
				view.render();
			},
			complete: function() {
				$.ui.hideMask();
			}
		});

		this.renderSubview(view);
	},
	renderBikeRepair: function(id, issueId) {
		var bike = this.bikes.get(id);
		var view = new BikeRepairView({
			app: this,
			model: bike,
			issueId: issueId
		});
		this.renderSubview(view);
	},

	renderAccount: function() {
		var view = new AccountView({
			app: this
		});
		this.renderSubview(view);
	},

	/**
	 * Continuous geolocation by HTML5 Geolocation with fallback to Google Geocoder
	 */
	geolocate: function() {
		var that = this;

		var success = function(position) {
			console.log('Geolocated: ', position);
			that.userPosition = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			that.trigger('geolocated');
		};
		var error = function(err) {
			if(err.code == 1) {
				console.log('Geolocation error: Access is denied!');
			} else if(err.code == 2) {
				console.log('Geolocation error: Position is unavailable!');
			}
			// Prompt for address and try to geocode it to GPS
			var manualLoc = manualLocation();
			localStorage.setItem(REKOLA.manualPosition, manualLoc);
			geocode(manualLoc);
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

		var manualLocation = function() {
			var answer = prompt('Lokalizace se nezdařila, zadej prosím tvojí adresu ručně:', localStorage.getItem(REKOLA.manualPosition));
			return answer || manualLocation();
		};

		if("geolocation" in navigator) {
			// navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true, timeout: 15000, maximumAge: 600000});
			that.geolocationWatcher = navigator.geolocation.watchPosition(success, error, {
				enableHighAccuracy: true,
				timeout: 30 * 1000,
				maximumAge: 0
			});
		} else {
			console.error('Browser doesn\'t support geolocation.');
			error();
		}

	},
	onGeolocation: function(callback) {
		var that = this;
		if(this.userPosition){
			callback(this.userPosition);
			return;
		}
		// wait for geolocation
		$.ui.showMask('Lokalizuji...');
		this.once('geolocated', function() {
			callback(that.userPosition);
			$.ui.hideMask();
		});
	},

	ping: function() {
		var that = this;
		this.onGeolocation(function(pos) {
			that.ajax({
				type: 'POST',
				url: REKOLA.remoteUrl + '/accounts/mine/ping',
				data: JSON.stringify({
					location: {
						lat: pos.lat,
						lng: pos.lng
					}
				})
			});
		});
	},

	addBike: function(bike) {
		this.bikes.add(bike, { merge: true });
	},

	go: function(where) {
		document.location.hash = where;
	},

	ajax: function(options) {
		var that = this;
		var defaults = {
			type: 'GET',
			contentType: 'application/json',
			dataType: 'json',
			headers: { 'X-Api-Key': this.apiKey	},
			error: function(xhr) {
				that.ajaxError(xhr, 'error');
			}
		};
		_.defaults(options, defaults);
		$.ajax(options);
	},

	/**
	 * Handle AJAX errors for authentication and other errors
	 * @param  {XMLHttpRequest} xhr  [description]
	 * @param  {String} type [description]
	 */
	ajaxError: function(xhr, type) {
		var data = JSON.parse(xhr.response);
		if(data.message){
			alert(data.message);
		}

		switch (type){
			case 'parsererror':
				console.error('AJAX parse error', xhr);
				break;
			case 'error':
				console.error('AJAX error', xhr);
				if(xhr.status == 401){
					// Clear login local session
					this.apiKey = false;
					this.logged = false;
					localStorage.removeItem(REKOLA.apiKey);
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
