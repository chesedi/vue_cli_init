'use strict';
import CommonConfig from './modules/common/Config';

const Config = {
	APPLICATION_PHASE: process.env.APPLICATION_PHASE,
	APPLICATION_VERSION: process.env.APPLICATION_VERSION,
	API_DOMAIN: process.env.VUE_APP_API_DOMAIN,
	UNIV_IMAGE_INFO: process.env.UNIV_IMAGE_INFO,
	API: {
		...CommonConfig,
	},
};

export default Config;
