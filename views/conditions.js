var ConditionsView = BasePanelView.extend({
	id: 'conditions',

	template: _.template($('#template-conditions').html()),

	events: {
		'change #agree': 'doAgree',
		'submit form': 'doAgree'
	},

	doAgree: function(e) {
		e.preventDefault();
		var that = this;
		var agree = $('#agree').val();

		that.app.ajax({
			type: 'POST',
			url: REKOLA.remoteUrl + '/accounts/mine/terms',
			data: JSON.stringify(agree),
			success: function(result) {
				that.app.go('index');
			}
		});

	},

	initialize: function() {
	},



});