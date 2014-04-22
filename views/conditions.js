var ConditionsView = BasePanelView.extend({
	id: 'conditions',

	template: _.template($('#template-conditions').html()),

	events: {
		'click .button-agree': 'doAgree',
		'click .button-disagree': 'doDisagree'
	},

	doAgree: function(e) {
		e.preventDefault();
		this.sendResponse(true);
	},
	doDisagree: function(e) {
		e.preventDefault();
		localStorage.removeItem(REKOLA.apiKey);
		this.options.app.apiKey = false;
		this.options.app.logged = false;
		this.options.app.go('login');
	},

	sendResponse: function(agreed) {
		var that = this;
		that.options.app.showMask('Odesílám...');
		that.options.app.ajax({
			url: REKOLA.remoteUrl + '/accounts/mine/terms',
			success: function(result) {
				that.options.app.go('index');
			},
			complete: function() {
				that.options.app.hideMask();
			}
		});
	},

});