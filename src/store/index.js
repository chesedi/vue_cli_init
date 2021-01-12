import Vue from 'vue';
import Vuex from 'vuex';
// import ES6Promise from 'es6-promise';

import env from './modules/env';
import exam from './modules/exam';
import user from './modules/user';
import popup from './modules/popup';
import score from './modules/score';

// ES6Promise.polyfill();
Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		env,
		exam,
		user,
		popup,
		score,
	},
});

export default store;
