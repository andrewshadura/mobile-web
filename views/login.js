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
			this.options.app.go('nearby');
		}
	},

	doLogin: function(e) {
		e.preventDefault();
		var that = this;
		var username = this.$('.username').val();
		var password = this.$('.password').val();

		this.options.app.showMask('Přihlašuji...');
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

					if(!result.terms){
						that.options.app.go('conditions');
					} else {
						that.options.app.go('index');
					}

				} else {
					alert('Přihlášení se nezdařilo, zkuste to znovu.');
				}
			},
			error: function(xhr) {
				console.error('Login failed', xhr);
                var result = JSON.parse(xhr.response);
                if (result.message){
                    alert(result.message);
                } else {
				    alert('Přihlášení se nezdařilo, zkuste to znovu.');
                }
			},
			complete: function() {
				that.options.app.hideMask();
			}
		});
	}

});
