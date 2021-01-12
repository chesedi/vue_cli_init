import Config from '@/config/Config';

export const util = {
	methods: {
		getUnivImageURI: function(code) {
			// return Config.UNIV_IMAGE_INFO.URI + code + Config.UNIV_IMAGE_INFO.EXT;
			return '/assets/ueImg/' + code + Config.UNIV_IMAGE_INFO.EXT;
		},
		setKanClass: function(score) {
			if (score > 7) {
				return 'high';
			} else if (score >= 6 && score <= 7) {
				return 'middle';
			} else if (score >= 4 && score <= 5) {
				return 'middlelow';
			} else if (score < 4) {
				return 'low';
			}
		},
		setKanGauge: function(score) {
			return `width:${score * 10}%`;
		},
	},
};
