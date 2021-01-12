import MutationTypes from '../../MutationTypes';
import API from '../../../config/api';
import logger from '../../../util/Logger';

export default {
	getLoginMember: async ({ commit }) => {
		try {
			const response = await API.getLoginMember();
      logger.debug('getLoginMember > response', response); // eslint-disable-line
			commit(MutationTypes.GET_LOGIN_MEMBER, response.data);
		} catch (e) {
			commit(MutationTypes.GET_LOGIN_MEMBER, {});
		}
	},

	initMemberInfo: async ({ commit }) => {
		commit(MutationTypes.INIT_MEMBER_INFO);
	},
};
