var BasePanelView = Backbone.View.extend({
	options: {
		app: {} // AppController instance
	},

	className: 'panel',

	render: function() {
		this.$el.html(this.template());
		return this;
	}
});

exports = BasePanelView;