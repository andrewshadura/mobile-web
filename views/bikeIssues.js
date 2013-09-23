var BikeIssuesView = BasePanelView.extend({
	id: 'bikeIssues',

	template: _.template($('#template-bikeissues').html()),

	events: {
		'submit form': ''
	},

	initialize: function(options) {
		console.log('BikeIssuesView init', options);
	},

	render: function() {
		console.log('BikeIssuesView render');
		this.$el.html(this.template({
			bike: this.model.toJSON()
		}));
		return this;
	}

});
