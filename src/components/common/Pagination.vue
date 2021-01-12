<template>
	<div
		class="pagination-g"
		role="navigation"
		aria-label="Pagination Navigation"
		v-if="isShow"
	>
		<!--
    <a href="#none" class="link-fst">처음</a>
    <a href="#none" class="link-next">다음</a>
    -->
		<a href="#none" class="link-page" @click.prevent="first">처음</a>
		<a href="#none" class="link-page" @click.prevent="prev">이전</a>

		<a
			href="#none"
			class="link-page"
			v-for="i in paging.list"
			:key="i"
			:class="currentClass(i)"
			@click.prevent="move(i)"
			>{{ i }}</a
		>

		<a href="#none" class="link-page" @click.prevent="next">다음</a>
		<a href="#none" class="link-page" @click.prevent="last">마지막</a>
		<!--
    <a href="#none" class="link-prev">다음</a>
    <a href="#none" class="link-fst">마지막</a>
    -->
	</div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
	name: 'Pagination',
	props: ['setting'],
	data: function() {
		return {
			size: 10,
			isShow: false,

			paging: {
				startIdx: 1,
				endIdx: 10,
				totalPage: 0,
				list: [],
			},
		};
	},
	computed: {},
	watch: {
		setting: function() {
			this.render();
		},
		'setting.totalCnt': function() {
			this.render();
		},
		'setting.page': function() {
			this.render();
		},
	},
	mounted: function() {
		this.render();
	},
	methods: {
		...mapActions(['openAlertPopup']),

		render: function() {
			if (this.setting.totalCnt > 0) this.isShow = true;
			else this.isShow = false;

			// 페이지 수 계산
			let tp = parseInt(this.setting.totalCnt / this.setting.offset);
			if (this.setting.totalCnt % this.setting.offset > 0) tp++;

			this.paging.totalPage = tp;

			// 시작 페이지, 마지막 페이지 계산
			this.paging.startIdx =
				parseInt((this.setting.page - 1) / this.size) * this.size + 1;

			const endIdx = this.paging.startIdx + this.size - 1;
			this.paging.endIdx =
				endIdx > this.paging.totalPage ? this.paging.totalPage : endIdx;

			this.paging.list = [];
			for (let i = this.paging.startIdx; i <= this.paging.endIdx; i++) {
				this.paging.list.push(i);
			}
		},

		currentClass: function(num) {
			if (this.setting.page === num) return { active: true };
			else return { active: false };
		},

		first: function() {
			this.$emit('goPage', { page: 1 });
		},

		prev: function() {
			if (this.setting.page < 2) {
				this.openAlertPopup({ cont: '첫 페이지 입니다.' });
			} else this.$emit('goPage', { page: this.setting.page - 1 });
		},

		next: function() {
			if (this.setting.page + 1 > this.paging.totalPage) {
				this.openAlertPopup({ cont: '마지막 페이지 입니다.' });
			} else this.$emit('goPage', { page: this.setting.page + 1 });
		},

		last: function() {
			this.$emit('goPage', { page: this.paging.totalPage });
		},

		move: function(num) {
			this.$emit('goPage', { page: num });
		},
	},
};
</script>
