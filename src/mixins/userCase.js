import { mapState } from 'vuex';

export const userCase = {
	data: function() {
		return {
			userCase: 1,
		};
	},
	computed: {
		...mapState({
			userInfo: (state) => state.user.info,
		}),
	},
	watch: {
		userInfo: function() {
			this.setUserCase();
		},
	},
	mounted: function() {
		this.setUserCase();
	},
	methods: {
		setUserCase: function() {
			if (!this.userInfo.memberId) this.userCase = 1;
			else if (this.userInfo.univCalcStatVal !== 2) this.userCase = 2;
			else if (this.userInfo.realApplyCnt > 0) this.userCase = 5;
			else if (this.userInfo.mockApplyCnt > 0) this.userCase = 4;
			else this.userCase = 3;

			// this.userCase = 2;
		},
	},
};
