/* REKOLA App initialization */
window.onload = function() {
	// Main app instances
	var app = new AppController();
	var router = new AppRouter({app: app});

	Backbone.history.start({
		pushState: false, // because of problematic hosting handling
		root: REKOLA.baseUrl
	});
	console.log('app.js:init done');
};