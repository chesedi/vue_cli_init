'use strict';

class BiginUtil {
	view(path) {
		// eslint-disable-next-line
    bigin.track('view', {
			pagePathname: path,
		});
		// eslint-disable-next-line
    bigin.executeCampaign();
	}

	login() {
		// eslint-disable-next-line
    bigin.user('login');
	}

	profile(options) {
		// eslint-disable-next-line
    bigin.user('profile', options);
	}

	logout() {
		// eslint-disable-next-line
    bigin.user('logout');
	}

	event(eventName, options) {
		// eslint-disable-next-line
    bigin.event(eventName, options);
	}
}

const biginUtil = new BiginUtil();
export default biginUtil;
