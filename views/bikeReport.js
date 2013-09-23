var BikeReportView = BasePanelView.extend({
	id: 'bikeReport',

	template: _.template($('#template-bikereport').html()),

	events: {
		'click .button-report': 'reportProblem',
		'submit form': 'reportProblem'
	},

	initialize: function(options) {
		console.log('BikeReportView init', options);
	},

	reportProblem: function(e) {
		var that = this;
		var id = this.model.get('id');
		var title, operational, description;
		title = this.$('form [name="title"]').val();
		operational = this.$('form [name="operational"]').val();
		description = this.$('form [name="desc"]').val();

		$.ui.showMask('Nahlašuji problém...');
		this.options.app.ajax({
			type: 'POST',
			url: REKOLA.remoteUrl + '/bikes/' + id + '/issues',
			data: JSON.stringify({
				title: title,
				description: description,
				disabling: !!operational,
				location: {
					lat: that.options.app.userPosition.lat,
					lng: that.options.app.userPosition.lng
				}
			}),
			success: function() {
				alert('Problém nahlášen, děkujeme.');
				that.options.app.go('/bike/' + id);
			},
			complete: function() {
				$.ui.hideMask();
			}
		});

		return false;
	},

	render: function() {
		console.log('BikeReportView render');
		this.$el.html(this.template({
			bike: this.model.toJSON()
		}));
		return this;
	},
});
