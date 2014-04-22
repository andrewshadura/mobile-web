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
		this.sendResponse(false);
	},

	sendResponse: function(agreed) {
		var that = this;
		that.options.app.showMask('Odesílám...');
		that.options.app.ajax({
			type: 'POST',
			url: REKOLA.remoteUrl + '/accounts/mine/terms',
			data: JSON.stringify(true),
			success: function(result) {
				if(agreed){
					that.options.app.go('index');
				} else {
					localStorage.removeItem(REKOLA.apiKey);
					this.options.app.apiKey = false;
					this.options.app.logged = false;
					this.options.app.go('login');
				}
			},
			complete: function() {
				that.options.app.hideMask();
			}
		});
	},

});