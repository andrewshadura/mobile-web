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
		e.preventDefault();
		var that = this;
		var id = this.model.get('id');
		var title, operational, description;
		title = this.$('form [name="title"]').val();
		operational = this.$('form [name="operational"]').get(0).checked;
		description = this.$('form [name="desc"]').val();

		if(description.length < 2){
			alert('Popište prosím problém s kolem, pomůže to jeho nápravě!');
			return;
		}

		this.options.app.showMask('Nahlašuji problém...');
		this.options.app.onGeolocation(function(pos) {
			that.options.app.ajax({
				type: 'POST',
				url: REKOLA.remoteUrl + '/bikes/' + id + '/issues',
				data: JSON.stringify({
					title: title,
					description: description,
					disabling: !operational,
					location: {
						lat: pos.lat,
						lng: pos.lng
					}
				}),
				success: function() {
					alert('Problém nahlášen, děkujeme.');
					that.options.app.go('/nearby');
				},
				complete: function() {
					that.options.app.hideMask();
				}
			});
		});
	},

	render: function() {
		console.log('BikeReportView render');
		this.$el.html(this.template({
			bike: this.model.toJSON()
		}));
		return this;
	},
});
