import { mapState, mapActions } from 'vuex';
import {
	setLocalStorageItem,
	getLocalStorageItem,
	removeLocalStorageItem,
} from '@/util/util';
import API from '@/config/api';
import axios from 'axios';

export const call = {
	data: function() {
		return {
			count: 0,
			apiCount: 0,
		};
	},
	computed: {
		...mapState({
			userInfo: (state) => state.user.info,
			serviceInfo: (state) => state.exam.servicePeriods,
			popupInfo: (state) => state.popup.info,
		}),
	},
	watch: {
		// count: function() {
		//   console.log('this.apiCount', this.apiCount, this.count);
		//   if (this.count != 0 && this.count == this.apiCount) {
		//     this.closeLoadingCall();
		//   }
		// },
	},
	methods: {
		...mapActions(['', 'closeAlertPopup', 'openLoading', 'closeLoading']),

		closeLoadingCall: function() {
			this.closeLoading();
			this.count = 0;
			this.apiCount = 0;
		},

		call: function(apis) {
			let loadingCheck = true;
			this.apiCount = apis.length;
			apis.forEach((item) => {
				if (item.isNoLoading) loadingCheck = false;
			});

			if (loadingCheck) this.openLoading();
			Promise.all(
				apis.map((item) => {
					if (
						typeof item.data === undefined ||
						typeof item.data === 'undefined' ||
						item.data === null ||
						item.data === ''
					) {
						if (
							typeof item.error === undefined ||
							typeof item.error === 'undefined' ||
							item.error === null ||
							item.error === ''
						) {
							return item.api();
						} else {
							return item.api().catch((e) => item.error(e));
						}
					} else {
						if (
							typeof item.error === undefined ||
							typeof item.error === 'undefined' ||
							item.error === null ||
							item.error === ''
						) {
							return item.api(item.data);
						} else {
							return item.api(item.data).catch((e) => item.error(e));
						}
					}
				}),
			)
				.then((responses) => {
					this.closeLoading();
					responses.forEach((response, index) => {
						if (
							typeof apis[index].callbackparam === undefined ||
							typeof apis[index].callbackparam === 'undefined' ||
							apis[index].callbackparam === null ||
							apis[index].callbackparam === ''
						) {
							apis[index].callback(response);
						} else {
							apis[index].callback(response, apis[index].callbackparam);
						}
						// this.count++;
						// if (index == responses.length - 1) {
						//   this.closeLoading();
						// }
					});

					this.checkToken(responses[responses.length - 1]);
					// this.closeLoading();
				})
				.catch((error) => {
					if (error.response) {
						this.closeLoading();
						if (error.response.status === 400) {
							if (error.response.data.code == 3002) {
								removeLocalStorageItem('ETOOS.TOKEN');
								document
									.getElementById('etoosWrap')
									.classList.remove('wrap-error');
								document
									.getElementById('etoosWrap')
									.classList.remove('etoos-case2');
								document
									.getElementById('etoosWrap')
									.classList.remove('wrap-etoos-print');
								document
									.getElementById('etoosWrap')
									.classList.remove('etoos-main');
								document
									.getElementById('etoosWrap')
									.classList.add('wrap-etoos');

								this.openAlertPopup({
									cont:
										'장시간 활동이 없어 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요.',
									cancel: () => {
										if (
											this.$router.history.current.name == 'main' &&
											!this.serviceInfo.pasdisqAnocmtSvcOpened
										) {
											document
												.getElementById('etoosWrap')
												.classList.add('etoos-main');
										}
										this.$router.push({ name: 'main' });
									},
									confirm: () => {
										this.$router.push({ name: 'login' });
									},
								});
							} else if (error.response.data.code == 3003) {
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
							} else {
								if (
									this.$router.history.current.name == 'resultPrint' ||
									this.$router.history.current.name == 'collegePrint' ||
									this.$router.history.current.name == 'studentPrint' ||
									this.$router.history.current.name == 'summaryPrint'
								) {
									alert(error.response.data.message);
								} else {
									this.openAlertPopup({
										cont: error.response.data.message,
										cancel: this.closeAlertPopup,
										confirm: this.closeAlertPopup,
									});
								}
							}
						} else if (error.response.status === 555) {
							this.$router.push({
								name: 'error',
								params: { status: 555 },
							});
						} else if (error.response.status === 404) {
							this.$router.push({
								name: 'error',
								params: { status: 404 },
							});
						} else {
							this.$router.push({
								name: 'error',
								params: { status: 500 },
							});
						}
					}
				});
		},

		callAll: function(apis) {
			return Promise.all(
				apis.map((item) => {
					if (
						typeof item.data === undefined ||
						typeof item.data === 'undefined' ||
						item.data === null ||
						item.data === ''
					) {
						if (
							typeof item.error === undefined ||
							typeof item.error === 'undefined' ||
							item.error === null ||
							item.error === ''
						) {
							return item.api();
						} else {
							return item.api().catch((e) => item.error(e));
						}
					} else {
						if (
							typeof item.error === undefined ||
							typeof item.error === 'undefined' ||
							item.error === null ||
							item.error === ''
						) {
							return item.api(item.data);
						} else {
							return item.api(item.data).catch((e) => item.error(e));
						}
					}
				}),
			);
		},

		callEach: function(apis) {
			apis.map((item) => {
				if (
					typeof item.data === undefined ||
					typeof item.data === 'undefined' ||
					item.data === null ||
					item.data === ''
				) {
					item
						.api()
						.then((response) => {
							if (
								typeof item.callbackparam === undefined ||
								typeof item.callbackparam === 'undefined' ||
								item.callbackparam === null ||
								item.callbackparam === ''
							) {
								item.callback(response);
							} else {
								item.callback(response, item.callbackparam);
							}
							this.checkToken(response);
						})
						.catch((error) => {
							if (
								typeof item.error === undefined ||
								typeof item.error === 'undefined' ||
								item.error === null ||
								item.error === ''
							) {
								this.error(error);
							} else {
								item.error(error);
							}
						});
				} else {
					item
						.api(item.data)
						.then((response) => {
							if (
								typeof item.callbackparam === undefined ||
								typeof item.callbackparam === 'undefined' ||
								item.callbackparam === null ||
								item.callbackparam === ''
							) {
								item.callback(response);
							} else {
								item.callback(response, item.callbackparam);
							}
							this.checkToken(response);
						})
						.catch((error) => {
							if (
								typeof item.error === undefined ||
								typeof item.error === 'undefined' ||
								item.error === null ||
								item.error === ''
							) {
								this.error(error);
							} else {
								item.error(error);
							}
						});
				}
			});
		},

		callSync: function(apis) {
			apis.forEach(async (item) => {
				if (
					typeof item.data === undefined ||
					typeof item.data === 'undefined' ||
					item.data === null ||
					item.data === ''
				) {
					await item
						.api()
						.then((response) => {
							if (
								typeof item.callbackparam === undefined ||
								typeof item.callbackparam === 'undefined' ||
								item.callbackparam === null ||
								item.callbackparam === ''
							) {
								item.callback(response);
							} else {
								item.callback(response, item.callbackparam);
							}
							this.checkToken(response);
						})
						.catch((error) => {
							if (
								typeof item.error === undefined ||
								typeof item.error === 'undefined' ||
								item.error === null ||
								item.error === ''
							) {
								this.error(error);
							} else {
								item.error(error);
							}
						});
				} else {
					await item
						.api(item.data)
						.then((response) => {
							if (
								typeof item.callbackparam === undefined ||
								typeof item.callbackparam === 'undefined' ||
								item.callbackparam === null ||
								item.callbackparam === ''
							) {
								item.callback(response);
							} else {
								item.callback(response, item.callbackparam);
							}
							this.checkToken(response);
						})
						.catch((error) => {
							if (
								typeof item.error === undefined ||
								typeof item.error === 'undefined' ||
								item.error === null ||
								item.error === ''
							) {
								this.error(error);
							} else {
								item.error(error);
							}
						});
				}
			});
		},

		error: function(error) {
      this.$logger.debug('error', error); // eslint-disable-line
		},

		checkToken: async function(res) {
			if (this.userInfo.memberNo) {
				const preToken = getLocalStorageItem('ETOOS.TOKEN');

				let gap = 0;
				if (res.data.timestamp) {
					gap = res.data.timestamp - preToken.timestamp;
				}
				// if (res && res.headers) {
				//   gap = new Date(res.headers.date).getTime() - preToken.timestamp;
				// }

				if (gap > 30 * 60 * 1000) {
					const response = await API.postUserRefreshToken();
					if (response.status === 200) {
						setLocalStorageItem('ETOOS.TOKEN', {
							token: response.data.token,
							timestamp: response.data.timestamp,
							// timestamp: new Date(response.data.timestamp).getTime(),
						});
						axios.defaults.headers.common['X-AUTH-TOKEN'] = response.data.token;
					}
				}
			}
		},
	},
};
