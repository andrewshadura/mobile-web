// Default application configuration
window.REKOLA = {
	// Application & API urls
	baseUrl: document.location.href.substring(0, document.location.href.lastIndexOf('/')),
	remoteUrl: document.location.href.substring(0, document.location.href.lastIndexOf('/')) + '/api',
	// Web storage keys
	apiKey: 'REKOLA-apiKey',
	rentedBike: 'REKOLA-rentedBike',
	manualPosition: 'REKOLA-manualPosition'

};