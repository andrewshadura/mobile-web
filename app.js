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

/* Application controller */

var AppController = Backbone.View.extend({
});


var AppRouter = Backbone.Router.extend({
	routes: {
		'': 'index',
		'*path':  'index'
	},

	index: function() {
		console.log('router: index');
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
		pushState: true,
		root: REKOLA.baseUrl
	});
	console.log('app.js:init done');
});

});