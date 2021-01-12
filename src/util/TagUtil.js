'use strict';
window.dataLayer = window.dataLayer || [];

class TagUtil {
	login(d1, d2, d3, d4) {
		window.dataLayer.push({
			event: 'defaultVariables',
			dimension1: d1, //유저아이디 ex) 039129001 (회원 식별할 수 있는 정보)
			dimension2: d2, //로그인 유지하기 여부 ex) Y, N
			dimension3: d3, //회원가입일 ex) 2019-11-10
			dimension4: d4, //졸업 연도 ex) 2021-02
		});
	}

	gradeSubmit(d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17) {
		window.dataLayer.push({
			event: 'gradeSubmit',
			dimension5: d5,
			dimension6: d6,
			dimension7: d7,
			dimension8: d8,
			dimension9: d9,
			dimension10: d10,
			dimension11: d11,
			dimension12: d12,
			dimension13: d13,
			dimension14: d14,
			dimension15: d15,
			dimension16: d16,
			dimension17: d17,
		});
	}

	mockApply(d18, d19, d20) {
		window.dataLayer.push({
			event: 'mockApply',
			dimension18: d18,
			dimension19: d19,
			dimension20: d20,
		});
	}
}

const tagUtil = new TagUtil();
export default tagUtil;
