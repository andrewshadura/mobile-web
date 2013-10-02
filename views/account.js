var AccountView = BasePanelView.extend({
	id: 'account',

	template: _.template($('#template-account').html()),

	events: {
		'click .button-changePass': 'changePassword',
		'click .button-logout': 'logout',
		'submit form': 'changePassword'
	},

	initialize: function(options) {
		console.log('AccountView init', options);
	},

	changePassword: function(e) {
		e.preventDefault();
		var form = this.$('form.password');
		var oldPass = this.$('input[name="oldPass"]').val();
		var newPass = this.$('input[name="newPass"]').val();
		var newPassConfirm = this.$('input[name="newPassConfirm"]').val();

		if(newPass != newPassConfirm){
			alert('Hesla nejsou stejná, zadej znovu a tentokrát pečlivěji!');
			return false;
		}

		$.ui.showMask('Měním heslo...');
		this.options.app.ajax({
			type: 'PUT',
			url: REKOLA.remoteUrl + '/accounts/mine/password',
			data: JSON.stringify({
				newPassword: newPass
			}),
			success: function() {
				alert('Heslo úspěšně změněno');
				form.get(0).reset();
			},
			complete: function() {
				$.ui.hideMask();
			}
		});
	},

	logout: function(e) {
		e.preventDefault();

		this.options.app.ajax({
			type: 'GET',
			url: REKOLA.remoteUrl + '/accounts/mine/logout'
		});

		localStorage.removeItem(REKOLA.apiKey);
		this.options.app.apiKey = false;
		this.options.app.logged = false;
		this.options.app.go('login');
	}

});
