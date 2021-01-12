import MutationTypes from '../../MutationTypes';

export default {
	openAlertPopup: async ({ commit }, _payload) => {
		commit(MutationTypes.OPEN_ALERT_POPUP, _payload);
	},

	closeAlertPopup: async ({ commit }, _payload) => {
		commit(MutationTypes.CLOSE_ALERT_POPUP, _payload);
	},

	openChoicePopup: async ({ commit }) => {
		commit(MutationTypes.OPEN_CHOICE_POPUP);
	},

	closeChoicePopup: async ({ commit }) => {
		commit(MutationTypes.CLOSE_CHOICE_POPUP);
	},

	openTermsPopup: async ({ commit }) => {
		commit(MutationTypes.OPEN_TERMS_POPUP);
	},

	closeTermsPopup: async ({ commit }) => {
		commit(MutationTypes.CLOSE_TERMS_POPUP);
	},

	openPrivatePopup: async ({ commit }) => {
		commit(MutationTypes.OPEN_PRIVATE_POPUP);
	},

	closePrivatePopup: async ({ commit }) => {
		commit(MutationTypes.CLOSE_PRIVATE_POPUP);
	},

	openKakaoPopup: async ({ commit }) => {
		commit(MutationTypes.OPEN_KAKAO_POPUP);
	},

	closeKakaoPopup: async ({ commit }) => {
		commit(MutationTypes.CLOSE_KAKAO_POPUP);
	},

	openLoading: async ({ commit }) => {
		commit(MutationTypes.OPEN_LOADING);
	},

	closeLoading: async ({ commit }) => {
		commit(MutationTypes.CLOSE_LOADING);
	},

	openUC1ValidatePopupActions: async ({ commit }, _payload) => {
		commit(MutationTypes.OPEN_UC1_VALIDATE_POPUP, _payload);
	},

	closeUC1ValidatePopupActions: async ({ commit }, _payload) => {
		commit(MutationTypes.CLOSE_UC1_VALIDATE_POPUP, _payload);
	},
};
