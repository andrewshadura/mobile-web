var AppRouter = Backbone.Router.extend({
	options: {
		app: {}, // AppController instance
	},
	routes: {
		'': 'index',
		'login': 'login',
		'nearby': 'nearby',
		'bike/:id': 'detail',
		'*path':  'index'
	},

	initialize: function(options) {
		this.options = options;
	},

	index: function() {
		this.go('nearby');
	},
	login: function() {
		console.log('router: login');
		this.options.app.renderLogin();
	},
	nearby: function() {
		console.log('router: nearby');
		this.options.app.renderBikesNearby();
	},
	detail: function(id) {
		console.log('router: detail', id);
		this.options.app.renderBikeDetail(id);
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
			if(!router.options.app.logged && route != 'login'){
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

exports = AppRouter;