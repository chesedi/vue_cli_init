import MutationTypes from '../../MutationTypes';

export default {
	[MutationTypes.OPEN_ALERT_POPUP]: (state, payload) => {
		state.info.isShow = true;
		state.info.cont = payload.cont;
		state.info.cancelName = payload.cancelName || '';
		state.info.cancel = payload.cancel || null;
		state.info.cancelParam = payload.cancelParam || {};
		state.info.confirmName = payload.confirmName || '';
		state.info.confirm = payload.confirm || null;
		state.info.confirmParam = payload.confirmParam || {};
	},

	[MutationTypes.CLOSE_ALERT_POPUP]: (state) => {
		state.info.isShow = false;
		state.info.cont = '';
		state.info.cancelName = '';
		state.info.cancel = null;
		state.info.cancelParam = {};
		state.info.confirmName = '';
		state.info.confirm = null;
		state.info.confirmParam = {};
	},

	[MutationTypes.OPEN_CHOICE_POPUP]: (state) => {
		state.showChoicePopup = true;
	},

	[MutationTypes.CLOSE_CHOICE_POPUP]: (state) => {
		state.showChoicePopup = false;
	},

	[MutationTypes.OPEN_TERMS_POPUP]: (state) => {
		state.showTermsPopup = true;
	},

	[MutationTypes.CLOSE_TERMS_POPUP]: (state) => {
		state.showTermsPopup = false;
	},

	[MutationTypes.OPEN_PRIVATE_POPUP]: (state) => {
		state.showPrivatePopup = true;
	},

	[MutationTypes.CLOSE_PRIVATE_POPUP]: (state) => {
		state.showPrivatePopup = false;
	},

	[MutationTypes.OPEN_LOADING]: (state) => {
		state.showLoading = true;
	},

	[MutationTypes.CLOSE_LOADING]: (state) => {
		state.showLoading = false;
	},

	[MutationTypes.OPEN_UC1_VALIDATE_POPUP]: (state, payload) => {
		state.isUC1ValidatePopup = true;
		state.uc1ValidatePopupInfo = payload;
	},

	[MutationTypes.CLOSE_UC1_VALIDATE_POPUP]: (state) => {
		state.isUC1ValidatePopup = false;
		state.uc1ValidatePopupInfo = {};
	},
};
