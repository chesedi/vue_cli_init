import MutationTypes from '../../MutationTypes';

export default {
	changeCheckStep0: async ({ commit }, _payload) => {
		commit(MutationTypes.CHANGE_CHECK_STEP0, _payload);
	},

	changeCheckStep1: async ({ commit }, _payload) => {
		commit(MutationTypes.CHANGE_CHECK_STEP1, _payload);
	},

	changeCheckStep2: async ({ commit }, _payload) => {
		commit(MutationTypes.CHANGE_CHECK_STEP2, _payload);
	},

	changeCheckStep3: async ({ commit }, _payload) => {
		commit(MutationTypes.CHANGE_CHECK_STEP3, _payload);
	},

	changeCheckStep4: async ({ commit }, _payload) => {
		commit(MutationTypes.CHANGE_CHECK_STEP4, _payload);
	},

	changeCheckComplete: async ({ commit }, _payload) => {
		commit(MutationTypes.CHANGE_CHECK_COMPLETE, _payload);
	},

	changeMockApplyDatetime: async ({ commit }, _payload) => {
		commit(MutationTypes.CHANGE_MOCK_APPLY_DATETIME, _payload);
	},
};
