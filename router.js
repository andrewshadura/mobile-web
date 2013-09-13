var AppRouter = Backbone.Router.extend({
	options: {
		app: {}, // AppController instance
	},
	routes: {
		'': 'index',
		'login': 'login',
		'nearby': 'nearby',
		'bike/getcode': 'getcode',
		'bike/:id': 'detail',
		'bike/:id/rented': 'rented',
		'bike/:id/return': 'return',
		'bike/:id/returned': 'returned',
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
	getcode: function() {
		console.log('router: getcode');
		this.options.app.renderBikeCode();
	},
	rented: function(id) {
		console.log('router: rented', id);
		this.options.app.renderBikeRented(id);
	},
	return: function(id) {
		console.log('router: return', id);
		this.options.app.renderBikeReturn(id);
	},
	returned: function(id) {
		console.log('router: returned', id);
		this.options.app.renderBikeReturned();
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
