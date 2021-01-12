import MutationTypes from '../../MutationTypes';
import API from '../../../config/api';
import logger from '../../../util/Logger';

export default {
	getCuurentExam: async ({ commit }) => {
		const response = await API.getCuurentExam();
    logger.debug('getCuurentExam > response', response); // eslint-disable-line
		commit(MutationTypes.GET_CURRENT_EXAM, response.data);
	},

	getRetieveServicePeriods: async ({ commit }) => {
		const response = await API.getRetieveServicePeriods();
    logger.debug('getRetieveServicePeriods > response', response); // eslint-disable-line
		commit(MutationTypes.GET_RETRIEVE_SERVICE_PERIODS, response.data);
	},
};
