import Config from '../../Config';
import axios from 'axios';
import RequestUtil from '@/util/RequestUtil';

const commonApi = {
	// token
	postToken: function(param) {
		const formData = new FormData();
		formData.append('memberId', param.memberId);
		formData.append('memberPwd', param.memberPwd);
		formData.append('answer', param.answer);
		formData.append('id', param.id);
		const url = Config.API_DOMAIN + Config.API.POST_TOKEN.URI;
		return axios.post(url, formData);
	},

	// 공지사항
	getRetrieveNoticeList: function(param) {
		console.log('Config', Config);
		const url =
			Config.API_DOMAIN +
			Config.API.GET_RETRIEVE_NOTICE_LIST.URI +
			RequestUtil.getPasingParam(param);
		return axios.get(url);
	},

	getRetrieveMyQuestionFileDownload: function(param) {
		const url =
			Config.API_DOMAIN +
			Config.API.GET_RETRIEVE_MY_QUESTION_FILE_DOWNLOAD.URI +
			RequestUtil.getPasingParam(param);
		return axios.get(url, {
			responseType: 'arraybuffer',
		});
	},

	postSaveMyQuestion: function(param) {
		const url = Config.API_DOMAIN + Config.API.POST_SAVE_MY_QUESTION.URI;
		const formData = new FormData();
		formData.append('notiarclTpCommCd', param.notiarclTpCommCd);
		formData.append('title', param.title);
		formData.append('cont', param.cont);
		formData.append('replyEmail', param.replyEmail);
		formData.append('replySmsTelNo', param.replySmsTelNo);
		formData.append('replySmsUseYn', param.replySmsUseYn);
		param.files.forEach((file) => {
			formData.append('files', file);
		});
		return axios.post(url, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	},
};

export default commonApi;
