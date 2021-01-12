import MutationTypes from '../../MutationTypes';

export default {
	[MutationTypes.GET_CURRENT_EXAM]: (state, payload) => {
		state.info = payload;
		// state.info.rlMrkgCd = 2;
	},

	[MutationTypes.GET_RETRIEVE_SERVICE_PERIODS]: (state, payload) => {
		state.servicePeriods = payload;
		// state.servicePeriods.pasdisqAnocmtSvcOpened = true;
	},
};
