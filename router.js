var AppRouter = Backbone.Router.extend({
	options: {
		app: {}, // AppController instance
	},
	routes: {
		'': 'index',
		'login': 'login',
		'conditions': 'conditions',
		'nearby': 'nearby',
		'bike/getcode': 'getcode',
		'bike/:id': 'detail',
		'bike/:id/rented': 'rented',
		'bike/:id/return': 'return',
		'bike/:id/returned': 'returned',
		'bike/:id/report': 'report',
		'bike/:id/issues': 'issues',
		'bike/:id/repair/:issueId': 'repair',
		'account': 'account',
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
	conditions: function() {
		console.log('router: conditions');
		this.options.app.renderConditions();
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
		this.options.app.renderBikeReturned(id);
	},
	report: function(id) {
		console.log('router: report', id);
		this.options.app.renderBikeReport(id);
	},
	issues: function(id){
		console.log('router: issues', id);
		this.options.app.renderBikeIssues(id);
	},
	repair: function(id, issueId) {
		console.log('router: repair', id, issueId);
		this.options.app.renderBikeRepair(id, issueId);
	},
	account: function() {
		console.log('router: account');
		this.options.app.renderAccount();
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
