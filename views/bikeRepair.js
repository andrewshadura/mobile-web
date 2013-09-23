var BikeRepairView = BasePanelView.extend({
	id: 'bikeRepair',

	template: _.template($('#template-bikerepair').html()),

	events: {
		'click .button-repair': 'repair',
		'submit form': 'repair'
	},

	initialize: function(options) {
		console.log('BikeRepairView init', options);
	},

	repair: function(e) {
		var that = this;
		var bikeId = this.model.get('id');
		var id = this.$('form [name="issue"]').val();
		var resolved = this.$('form [name="resolved"]').get(0).checked;
		var costs = this.$('form [name="costs"]').val();
		var time = this.$('form [name="time"]').val();
		var description = this.$('form [name="desc"]').val();

		$.ui.showMask('Opravuji problém...');
		this.options.app.ajax({
			type: 'POST',
			url: REKOLA.remoteUrl + '/bikes/' + bikeId + '/issues/' + id + '/updates',
			data: JSON.stringify({
				description: description,
				open: !resolved,
				costs: {
					material: parseInt(costs, 10),
					time: parseInt(time, 10)
				},
				location: {
					lat: that.options.app.userPosition.lat,
					lng: that.options.app.userPosition.lng
				}
			}),
			success: function() {
				alert('Oprava uložena, odměna tě nemine!');
				that.options.app.go('/nearby');
			},
			complete: function() {
				$.ui.hideMask();
			}
		});

		return false;
	},

	render: function() {
		console.log('BikeRepairView render');
		this.$el.html(this.template({
			bike: this.model.toJSON(),
			issueId: this.options.issueId
		}));
		return this;
	},
});
