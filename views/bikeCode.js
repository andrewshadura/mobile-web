var BikeCodeView = BasePanelView.extend({
	attributes: {
		'data-title': 'Kód kola'
	},
	id: 'bikeCode',

	template: _.template($('#template-bikecode').html()),

	events: {
		'click .button-getcode': 'getCode',
		'submit form': 'getCode'
	},

	initialize: function(options) {
		console.log('BikeCodeView init', options);
	},

	getCode: function(e) {
		var that = this;
		var bikeId = this.model.get('id');
		var bikeCode = this.$('.code').val();
		$.ui.showMask('Získávám kód zámku...');

		this.options.app.ajax({
			url: REKOLA.remoteUrl + '/bikes/' + bikeId + '/lock-code',
			data: { bikeCode: bikeCode },

			success: function(result) {
				that.model.rent(bikeCode, result.lockCode);
				that.options.app.go('bike/' + bikeId + '/rented');
			},
			complete: function() {
				$.ui.hideMask();
			}
		});

		return false;
	},

	render: function() {
		console.log('BikeCodeView render');
		this.$el.html(this.template());
		return this;
	},
});
