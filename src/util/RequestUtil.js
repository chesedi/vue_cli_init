'use strict';

class RequestUtil {
	getParamMap() {
		const reqMap = {};

		let url = unescape(encodeURIComponent(location.href));
		url = url.split('#')[0];
		url = decodeURIComponent(url);
		const paramArr = url.substring(url.indexOf('?') + 1, url.length).split('&');

		for (let i = 0; i < paramArr.length; i++) {
			const temp = paramArr[i].split('=');
			reqMap[temp[0]] = temp[1];
		}

		return reqMap;
	}

	getPasingParam(obj) {
    let idx = 0; // eslint-disable-line
		let str = '';
		for (const key in obj) {
			if (
				typeof obj[key] !== undefined &&
				typeof obj[key] !== 'undefined' &&
				obj[key] !== null &&
				obj[key] !== ''
			) {
				let param = '';
				if (Array.isArray(obj[key])) {
					obj[key].forEach((item, index) => {
						if (index !== 0) param += '&';
						param += key + '=' + encodeURIComponent(item);
					});
				} else {
					param = key + '=' + encodeURIComponent(obj[key]);
				}

				if (param !== '') {
					if (str === '') str += '?' + param;
					else str += '&' + param;
				}

				idx++;
			}
		}

		return str;
	}
}

const requestUtil = new RequestUtil();
export default requestUtil;
