import actions from './actions';
import mutations from './mutations';

const state = {
	info: {
		isShow: false,
		cont: '',
		cancelName: '',
		cancel: null,
		cancelParam: {},
		confirmName: '',
		confirm: null,
		confirmParam: {},
	},
	showChoicePopup: false,
	showTermsPopup: false,
	showPrivatePopup: false,
	showKakaoPopup: false,
	showLoading: false,
	isUC1ValidatePopup: false,
	uc1ValidatePopupInfo: {},
};

export default {
	state,
	actions,
	mutations,
};
