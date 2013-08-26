$(function() {
// Main app instances
var app, router;

/* Models */
var Bike = Backbone.Model.extend({

	defaults: function() {
		return {
			/*id: 0,*/
			position: { lat: null, lng: null},
			address: 'Ulice, č.p., Město',
			positionNote: '',
			type: 'old',
			state: 'free',
		}
	},

	borrow: function(bikeCode) {
		this.state = 'mine';
		// ...
		return this._getUnlockCode(bikeCode);
	},

	putBack: function(bikePosition, note) {
		// ...
	},

	_getUnlockCode: function(bikeCode) {
		// ...
		return '12345'
	}

});

/* Collections */
var BikeList = Backbone.Collection.extend({
	model: Bike
});

var Bikes = new BikeList;

/* Views */
var BaseView = Backbone.View.extend({
	render: function() {
		this.$el.html(this.template());
		return this;
	}
});
var BasePanelView = BaseView.extend({
	className: 'panel'
});

var LoginView = BasePanelView.extend({
	attributes: {
		title: 'ReKola - přihlášení'
	},
	id: 'login',

	template: _.template($('#template-login').html()),

	events: {
		'click .button-login': 'doLogin'
	},

	initialize: function() {
		var apiKey = localStorage.getItem('apiKey');
		if(apiKey){
			app.logged = true;
			router.go('index');
		}
	},

	doLogin: function(e) {
		e.preventDefault();
		var username = this.$('.username').val();
		var password = this.$('.password').val();
		$.ui.showMask('Přihlašuji...');
		// @TODO waits for API specs
		$.ajax({
			type: 'POST',
			url: REKOLA.remoteUrl + '/accounts/mine/login',
			contentType: 'application/json',
			dataType: 'json',
			data: {
				'data': {
					'username': username,
					'password': password
				}
			},
			success: function(result) {
				console.log('Response: ', result);
				if(result.data && result.data.apiKey){
					localStorage.setItem('apiKey', result.data.apiKey);
					app.logged = true;
					router.go('index');
				} else {
					alert('Přihlášení se nezdařilo, zkuste to znovu.');
				}
				$.ui.hideMask();
			},
			error: function(xhr) {
				console.error('Login failed', xhr);
				alert('Přihlášení se nezdařilo, zkuste to znovu.');
				$.ui.hideMask();
			}
		});
	}

});


var BikesNearbyView = BasePanelView.extend({
	attributes: {
		title: 'Kola okolo'
	},
	id: 'bikesNearby',

	template: _.template($('#template-bikesnearby').html()),

	render: function() {
		this.$el.html(this.template({
			myPosition: app.userPosition.lat + ', ' + app.userPosition.lng
		}));
		return this;
	}

});

/* Application controller */

var AppController = Backbone.View.extend({
	el: $('#content'),

	logged: false,
	userPosition: false,

	initialize: function() {

	},
	renderLogin: function() {
		var view = new LoginView();
		this.$el.append(view.render().el);
		$.ui.loadContent('#'+view.id, true, false, 'none');
	},
	renderBikesNearby: function() {
		var that = this;
		this.geolocate(function() {
			var view = new BikesNearbyView();
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

	}

});


var AppRouter = Backbone.Router.extend({
	routes: {
		'': 'index',
		'login': 'login',
		'nearby': 'nearby',
		'*path':  'index'
	},

	index: function() {
		this.go('nearby');
	},
	login: function() {
		console.log('router: login');
		app.renderLogin();
	},
	nearby: function() {
		console.log('router: nearby');
		app.renderBikesNearby();
	},

	// Alias for navigation
	go: function(where) {
		this.navigate(where, {trigger: true});
	},
	// Route override for checking user authentication
	route: function(route, name, callback) {
		var router = this;
		if (!callback) callback = this[name];
		var f = function() {
			// before route
			if(!app.logged && route != 'login'){
				this.go('login');
				return false;
			}
			// actual routing
			callback.apply(router, arguments);
			// after route
		};
		return Backbone.Router.prototype.route.call(this, route, name, f);
	},

});


// Finally, we kick things off
$.ui.ready(function() {
	app = new AppController();
	router = new AppRouter();

	Backbone.history.start({
		pushState: false, // because of problematic hosting handling
		root: REKOLA.baseUrl
	});
	console.log('app.js:init done');
});

// Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
/*$.ajaxSetup({
	statusCode: {
		401: function(){
			app.go('login'); // Redirec the to the login page.
		},
		403: function() {
			app.go('denied'); // 403 -- Access denied
		}
	}
});*/

});