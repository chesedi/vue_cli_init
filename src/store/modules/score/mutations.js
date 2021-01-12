import MutationTypes from '../../MutationTypes';

export default {
	[MutationTypes.CHANGE_CHECK_STEP0]: (state, payload) => {
		state.checkStep0 = payload;
	},

	[MutationTypes.CHANGE_CHECK_STEP1]: (state, payload) => {
		state.checkStep1 = payload;
	},

	[MutationTypes.CHANGE_CHECK_STEP2]: (state, payload) => {
		state.checkStep2 = payload;
	},

	[MutationTypes.CHANGE_CHECK_STEP3]: (state, payload) => {
		state.checkStep3 = payload;
	},

	[MutationTypes.CHANGE_CHECK_STEP4]: (state, payload) => {
		state.checkStep4 = payload;
	},

	[MutationTypes.CHANGE_CHECK_COMPLETE]: (state, payload) => {
		state.checkStepComplete = payload;
	},

	[MutationTypes.CHANGE_MOCK_APPLY_DATETIME]: (state, payload) => {
		state.mockApplyDateTime = payload;
	},
};
