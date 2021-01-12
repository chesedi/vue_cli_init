import actions from './actions';
import mutations from './mutations';

const state = {
	info: {
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
	},
};

export default {
	state,
	actions,
	mutations,
};
