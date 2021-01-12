import MutationTypes from '../../MutationTypes';

export default {
	setIsMobile: async ({ commit }, _payload) => {
		commit(MutationTypes.SET_IS_MOBILE, _payload);
	},
	setIsPoupChange: async ({ commit }, _payload) => {
		commit(MutationTypes.SET_IS_POPUP_CHANGE, _payload);
	},
};
