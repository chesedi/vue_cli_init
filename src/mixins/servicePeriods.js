import { mapState, mapActions } from 'vuex';
import { call } from '@/mixins/call';

export const servicePeriods = {
	mixins: [call],
	data: function() {
		return {
			isRealServicePopup: false,
			isNonSchedulePopup: false,
			isNonScheduleSavePopup: false,
			isPass: '',
			isBlackListPopup: false,
		};
	},
	computed: {
		...mapState({
			userInfo: (state) => state.user.info,
			examInfo: (state) => state.exam.info,
			serviceInfo: (state) => state.exam.servicePeriods,
		}),
	},
	methods: {
		...mapActions(['openAlertPopup']),

		checkRealService: function() {
			if (
				this.userInfo.memberId &&
				this.examInfo.rlMrkgCd == 2 &&
				(!this.userInfo.realScrngYn || this.userInfo.realScrngYn == 'N')
			) {
				this.openRealServicePopup();
			}
		},

		openRealServicePopup: function() {
			this.isRealServicePopup = true;
		},

		closeRealServicePopup: function() {
			this.isRealServicePopup = false;
		},

		checkNonScheduleService: function() {
			let check = false;
			if (
				typeof this.userInfo.irglprdPassYn == 'undefined' ||
				this.userInfo.irglprdPassYn == ''
			)
				check = false;
			else if (this.userInfo.irglprdPassYn == 'N') check = true;

			if (
				this.serviceInfo.irglprdPasdisqAnocmtSvcOpened &&
				check &&
				this.examInfo.rlMrkgCd == 2
			) {
				this.openNonSchedulePopup();
			}
		},

		openNonSchedulePopup: function() {
			this.isNonSchedulePopup = true;
		},

		closeNonSchedulePopup: function() {
			this.isNonSchedulePopup = false;
		},

		openNonScheduleSavePopup: function(param) {
			this.closeNonSchedulePopup();
			this.isPass = param.isPass;
			this.isNonScheduleSavePopup = true;
		},

		closeNonScheduleSavePopup: function() {
			this.isNonScheduleSavePopup = false;
		},

		checkBlackList: function() {
			if (this.userInfo.blclstYn == 'Y') {
				this.openAlertPopup({
					cont:
						'등록하신 성적표 인증 내역이 부적합한 것으로 확인되어 서비스 이용이 제한되었습니다. 수능 성적표의 정보가 잘 식별될 수 있도록 재촬영 및 첨부하여 1:1 이용문의 또는 moji_cs@etoos.com를 통해 문의해주세요.',
					confirmName: '1:1이용문의 바로가기',
					confirm: () => {
						this.$router.push({
							name: 'guideWrite',
						});
					},
				});
			}
		},
	},
};
