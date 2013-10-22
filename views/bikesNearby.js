var BikesNearbyView = BasePanelView.extend({
	id: 'bikesNearby',

	template: _.template($('#template-bikesnearby').html()),

	events: {
		'click .bikeDetail': 'bikeDetail'
	},

	initialize: function(options) {
		console.log('BikesNearbyView init', options);
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function() {
		console.log('BikesNearbyView render');

		var params = {
			position: this.options.app.userPosition ? (this.options.app.userPosition.lat + ', ' + this.options.app.userPosition.lng) : false,
			bikes: this.model.toJSON(),
			gmapsStaticUrl: ''
		};

		//gmaps static my position + 10 closest bikes positions
		if(params.position) {
			var width = $('#app').width(); //to determine the right width we need html: overflow-h: scroll
			width = width>640 ? 640 : width; //google maps can handle this, but this way we know the width
			params.gmapsStaticUrl = 'http://maps.googleapis.com/maps/api/staticmap?key=AIzaSyCWUjiJIxtc8IGKGIFXaANqKXPaAup9DsI&sensor=true&visual_refresh=true';
			params.gmapsStaticUrl += '&size='+width+'x300';
			//params.gmapsStaticUrl += '&style=feature:all|element:geometry';
			//params.gmapsStaticUrl += '&zoom=16';
			//params.gmapsStaticUrl += '&maptype=terrain'; //roadmap/terrain
			for (var i = 0; (i < 5 && i < params.bikes.length); i++) {
				var loc = params.bikes[i].location;
				params.gmapsStaticUrl += '&markers=label:'+(i+1)+'%7C' + loc.lat + ',' + loc.lng;
			}
			params.gmapsStaticUrl += '&markers=color:blue%7C' + params.position;
		}


		this.$el.html(this.template(params));
		return this;
	},

	bikeDetail: function(e) {
		e.preventDefault();
		this.options.app.go('bike/' + $(e.currentTarget).data('id'));
	}

});
