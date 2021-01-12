'use strict';

class FbqUtil {
	track(code) {
		// eslint-disable-next-line
    fbq('track', code);
	}
}

const fbqUtil = new FbqUtil();
export default fbqUtil;
