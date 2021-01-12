import MutationTypes from '../../MutationTypes';

export default {
	[MutationTypes.GET_LOGIN_MEMBER]: (state, payload) => {
		state.info = payload;
		// state.info.univCalcStatVal = 1;
	},

	[MutationTypes.INIT_MEMBER_INFO]: (state) => {
		state.info = {
			gndrDivFlag: '',
			srvTmCnt: 0,
			blclstYn: '',
			memberPwd: '',
			grduYy: '',
			clstechrModeNmbrDelYn: '',
			serverTimestamp: '',
			prefDtlAflianCommCd: '',
			prefRegnCommCd: '',
			memberNo: 0,
			regDt: '',
			memberCertYn: '',
			prefAflianCommCd: '',
			memNo: '',
			schCd: '',
			absnDayCnt: 0,
			memNm: '',
			email: '',
			memberId: '',
			memberTelNo: '',
		};
	},
};
