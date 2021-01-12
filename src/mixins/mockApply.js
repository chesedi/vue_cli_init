import { mapState, mapActions } from 'vuex';
import API from '@/config/api';
import { call } from '@/mixins/call';
import DateUtil from '@/util/DateUtil';
import biginUtil from '@/util/BiginUtil';
import tagUtil from '@/util/TagUtil';

export const mockApply = {
	data: function() {
		return {
			isMockApplyPopup: false,
			isImpossibleMockApplyPopup: false,
			tempUeCd: '',
			isLastCheckPopup: false,
			firstMockApplyItem: {},
		};
	},
	mixins: [call],
	computed: {
		...mapState({
			examInfo: (state) => state.exam.info,
			userInfo: (state) => state.user.info,
		}),
	},
	watch: {},
	mounted: function() {},
	methods: {
		...mapActions(['getLoginMember']),

		async goMockApply(item) {
			try {
				const response = await API.getRetrieveMyProcessStat();
				if (response.data && response.data.length > 0) {
					const last = response.data.filter((obj) => obj.stepNo == 5);
					if (last && last.length > 0 && last[0].cont > 0) {
						this.tempUeCd = item.ueCd;
						const param = {
							data: {
								// examNo: this.examInfo.examNo,
								ueCd: item.ueCd,
							},
						};
						const apis = [
							{
								api: API.putExecuteMockApply,
								data: param,
								callback: this.executeMockApplyCallback,
								callbackparam: item,
								error: this.executeMockApplyErrorCallback,
							},
						];
						this.call(apis);
					} else {
						this.tempUeCd = item.ueCd;
						this.firstMockApplyItem = item;
						this.isLastCheckPopup = true;
					}
				}
			} catch (error) {
				this.executeMockApplyErrorCallback(error);
			}
		},
		executeMockApplyCallback(response, item) {
			if (response.status === 200) {
				biginUtil.event('applySimulation', {
					type: this.examInfo.rlMrkgCd == 1 ? 'virtual' : 'actual',
					// type2: '모의지원',
					major: item.conName,
					university: item.univNm,
					// applyTimes 모의지원 횟수를 누적하기 위한 값
					// menu :모의지원  menu 값에 대한 설명'
					// date	String	Y	모의지원 날짜에 해당하는 값
					// finalApply	Bool	Y	최종지원 여부에 해당하는 값
					//True 일 경우 최종지원,
					//False 일 경우 모의지원
					// majorGroup	String	Y 모지 선호전공 분류에 따라 매칭하여 저장
				});
				tagUtil.mockApply(
					item.univNm,
					item.conName,
					DateUtil.getDateString2(new Date()),
				);
				this.isMockApplyPopup = true;
				this.mockApplyResult = response.data;
				this.getLoginMember();
			}
		},
		executeMockApplyErrorCallback(error) {
			if (error.response.status === 400) {
				//모의지원을 20개를 초과
				if (error.response.data.code == '2010') {
					this.isImpossibleMockApplyPopup = true;
				}
			}
		},
		closeMockApplyPopup() {
			this.isMockApplyPopup = false;
			this.isLastCheckPopup = false;
			this.firstMockApplyItem = {};
			if (this.$router.history.current.name == 'recommend') {
				this.changeStatus(this.tempUeCd);
			} else {
				if (this.search) this.search();
				if (this.getSearchResult) this.getSearchResult();
				if (this.getPrefUniv) this.getPrefUniv();
				if (this.getEvaluation) this.getEvaluation();
				if (this.getMojipList) this.getMojipList(); // 자원전략추천
			}
		},
		closeMockApplyPopup2() {
			this.isLastCheckPopup = false;
			this.firstMockApplyItem = {};
		},
		goMyMockApply() {
			this.isMockApplyPopup = false;
			this.$router.push({
				name: 'simulation',
			});
		},
		goResultAnalysis(ueCd) {
			this.isMockApplyPopup = false;
			if (this.search) this.search();
			if (this.getSearchResult) this.getSearchResult();
			if (this.getPrefUniv) this.getPrefUniv();
			const routeData = this.$router.resolve({
				name: 'apply',
				params: { ueCd: ueCd },
			});
			window.open(routeData.href, '_blank');
		},
		closeImpossibleMockApplyPopup() {
			this.isImpossibleMockApplyPopup = false;
		},
	},
};
