/* Intel App Framework initialization */
$.ui.autoLaunch = false; //By default, it is set to true and you're app will run right away.  We set it to false to show a splashscreen
$.ui.manageHistory = false;
$.ui.loadDefaultHash = false;
$.ui.backButtonText = "Zpět";
$.ui.showBackButton = false;
$.ui.showNavMenu = false;

window.onload = function() {
	$.ui.launch();
};

/* REKOLA App initialization */
var AppRouter = require('router');
var AppController = require('controllers/app');

$.ui.ready(function () {
	$.ui.removeFooterMenu();

	// Main app instances
	var app = new AppController();
	var router = new AppRouter({app: app});

	Backbone.history.start({
		pushState: false, // because of problematic hosting handling
		root: REKOLA.baseUrl
	});
	console.log('app.js:init done');

});