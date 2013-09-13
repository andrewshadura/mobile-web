var LoginView = BasePanelView.extend({
	id: 'login',

	template: _.template($('#template-login').html()),

	events: {
		'click .button-login': 'doLogin',
		'submit form': 'doLogin'
	},

	initialize: function() {
		var apiKey = localStorage.getItem(REKOLA.apiKey);
		if(apiKey){
			this.options.app.apiKey = apiKey;
			this.options.app.logged = true;
			this.options.app.go('index');
		}
	},

	doLogin: function(e) {
		var that = this;
		var username = this.$('.username').val();
		var password = this.$('.password').val();
		$.ui.showMask('Přihlašuji...');
		// @TODO waits for API specs
		$.ajax({
			type: 'POST',
			url: REKOLA.remoteUrl + '/accounts/mine/login',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify({
				'username': username,
				'password': password
			}),
			success: function(result) {
				console.log('Response: ', result);
				if(result.apiKey){
					localStorage.setItem(REKOLA.apiKey, result.apiKey);
					that.options.app.apiKey = result.apiKey;
					that.options.app.logged = true;
					that.options.app.go('index');
				} else {
					alert('Přihlášení se nezdařilo, zkuste to znovu.');
				}
				$.ui.hideMask();
			},
			error: function(xhr) {
				console.error('Login failed', xhr);
				alert('Přihlášení se nezdařilo, zkuste to znovu.');
				$.ui.hideMask();
			}
		});

		return false;
	}

});
