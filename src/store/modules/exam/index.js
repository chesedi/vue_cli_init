import actions from './actions';
import mutations from './mutations';

const state = {
	info: {
		alotbSvcEdDt: '',
		examDt: '',
		examEdDt: '',
		examNm: '',
		examNo: 0,
		examStDt: '',
		irglprdPasdisqRsltAnocmtDt: '',
		mnptUpdEtDt: null,
		mnptUpdStDt: null,
		rlMrkgCd: 0,
		serverTimestamp: '',
	},
	servicePeriods: {
		ddayJungsiSvcEdDt: '',
		ddayJungsiSvcOpened: false,
		ddayJungsiSvcStDt: '',
		ddaySusiSvcEdDt: '',
		ddaySusiSvcOpened: false,
		ddaySusiSvcStDt: '',
		irglprdPasdisqAnocmtSvcEdDt: '',
		irglprdPasdisqAnocmtSvcOpened: false,
		irglprdPasdisqAnocmtSvcStDt: '',
		pasdisqAnocmtSvcEdDt: '',
		pasdisqAnocmtSvcOpened: false,
		pasdisqAnocmtSvcStDt: '',
		timestamp: '',
		trialOnlySvcEdDt: '',
		trialOnlySvcOpened: false,
		trialOnlySvcStDt: '',
		trialSvcEdDt: '',
		trialSvcOpened: false,
		trialSvcStDt: '',
		trialPopupSvcStDt: '',
		trialPopupSvcStEt: '',
		trialPopupSvcOpened: false,
	},
};

export default {
	state,
	actions,
	mutations,
};
