export const alert = {
	data: function() {
		return {
			isAlertPopup: false,
			alertData: {
				cont: '',
				cancel: null,
				confirm: null,
			},
		};
	},
	methods: {
		openAlertPopup: function(alertData) {
			this.alertData = alertData;
			this.isAlertPopup = true;
		},

		closeAlertPopup: function() {
			this.isAlertPopup = false;
		},
	},
};
