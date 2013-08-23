$(function() {
// Main app instances
var app, router;

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

	doLogin: function(e) {
		e.preventDefault();
		var username = this.$('.username').val();
		var password = this.$('.password').val();
		$.ui.showMask('Přihlašuji...');
		$.ajax({
			type: 'post',
			url: REKOLA.remoteUrl + '/accounts/mine/ping',
			headers: {"Authorization": "Basic " + window.btoa(username + ":" + password)},
			success: function(data) {
				console.log('Response: ', data);
				app.logged = true;
				router.go('nearby');
				$.ui.hideMask();
			}
		})
	}
});

var BikesNearbyView = BasePanelView.extend({
	attributes: {
		title: 'Kola okolo'
	},
	id: 'bikesNearby',

	template: _.template($('#template-bikesnearby').html())
});

/* Application controller */

var AppController = Backbone.View.extend({
	el: $('#content'),
	logged: false,
	initialize: function() {

	},
	renderLogin: function() {
		var view = new LoginView();
		this.$el.append(view.render().el);
		$.ui.loadContent('#'+view.id, true, false, 'none');
	},
	renderBikesNearby: function() {
		var view = new BikesNearbyView();
		this.$el.append(view.render().el);
		$.ui.loadContent('#'+view.id, true, false, 'slide');
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
		console.log('router: index');
		if(!app.logged){
			this.go('login');
		}
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
	}
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

});