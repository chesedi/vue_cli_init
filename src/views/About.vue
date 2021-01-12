<template>
	<div id="cMain">
		<article id="mArticle" class="cont-help">
			<h2 id="etoosBody" class="tit-cont">공지사항</h2>
			<div class="box-board">
				<table class="tbl-board">
					<colgroup>
						<col style="width:100px" />
						<col style="width:auto" />
						<col style="width:110px" />
						<col style="width:92px" />
					</colgroup>
					<thead>
						<th>NO.</th>
						<th>제목</th>
						<th>등록일</th>
						<th>보기</th>
					</thead>
					<tbody ref="noticeList">
						<template v-for="(item, index) in notice.list">
							<tr
								v-if="isSortSeq(item.sortSeq)"
								class="accordion-g  pin-area"
								title="상세내용 열림"
								:key="index"
								:data="item.notiarclNo"
							>
								<!-- 고정인 경우 fixed 클래스를 넣어야함. -->
								<td class="num">
									<img
										src="/assets/images/ico-notice.png"
										class="ico-notice"
										alt="공지사항"
									/>
								</td>
								<td class="tit-notice">
									<strong>{{ item.title }}</strong
									><span class="mark-new" v-if="isNew(item.regDt)"
										><span class="screen-out">New</span></span
									>
								</td>
								<td class="txt-date">{{ getRegDt(item.regDt) }}</td>
								<td>
									<div class="btn-open"></div>
								</td>
							</tr>
							<tr
								v-else
								class="accordion-g"
								title="상세내용 열림"
								:key="index"
								:data="item.notiarclNo"
							>
								<!-- 고정인 경우 fixed 클래스를 넣어야함. -->
								<td class="num">{{ item.notiarclNo }}</td>
								<td class="tit-notice">
									<strong>{{ item.title }}</strong
									><span class="mark-new" v-if="isNew(item.regDt)"
										><span class="screen-out">New</span></span
									>
								</td>
								<td class="txt-date">{{ getRegDt(item.regDt) }}</td>
								<td>
									<div class="btn-open"></div>
								</td>
							</tr>
							<tr class="panel-cont" :key="index + 'c'">
								<td></td>
								<td class="noti-details">
									<p v-html="getContent(item.cont)"></p>
								</td>
								<td colspan="2"></td>
							</tr>
						</template>
					</tbody>
				</table>
			</div>
			<pagination :setting="notice.setting" @goPage="goPage"></pagination>
		</article>
	</div>
</template>

<script>
import API from '@/config/api';
import { call } from '@/mixins/call';
import DateUtil from '@/util/DateUtil';
import Pagination from '@/components/common/Pagination';

export default {
	name: 'NoticeLayout',
	mixins: [call],
	components: { Pagination },
	data: function() {
		return {
			notice: {
				setting: {
					limit: 15,
					offset: 15,
					page: 1,
					totalCnt: 0,
				},
				list: [],
			},
			count: '',
		};
	},
	computed: {},
	mounted: function() {
		this.getNoticeList();
	},
	methods: {
		getNoticeList: function() {
			const param = {
				limit: this.notice.setting.limit,
				offset: this.notice.setting.offset,
				page: this.notice.setting.page,
			};

			const apis = [
				{
					api: API.getRetrieveNoticeList,
					data: param,
					callback: this.retrieveNoticeListCallback,
				},
			];
			this.call(apis);
		},

		retrieveNoticeListCallback: function(response) {
			this.offAccordion();
			this.notice.list = response.data.items;
			this.notice.setting.totalCnt = response.data.totalCnt;
			this.$nextTick(() => {
				this.onAccordion();
			});

			const acc = document.getElementsByClassName('accordion-g');
			for (let i = 0; i < acc.length; i++) {
				acc[i].classList.remove('on');
			}
		},

		onAccordion: function() {
			const acc = document.getElementsByClassName('accordion-g');

			for (let i = 0; i < acc.length; i++) {
				acc[i].addEventListener('click', this.accordion);
			}
		},

		offAccordion: function() {
			const acc = document.getElementsByClassName('accordion-g');

			for (let i = 0; i < acc.length; i++) {
				acc[i].removeEventListener('click', this.accordion);
			}
		},

		accordion: function(obj) {
			if (window.NodeList && !NodeList.prototype.forEach) {
				NodeList.prototype.forEach = Array.prototype.forEach;
			}

			if (
				obj.target.classList.value == 'btn-open' ||
				obj.target.className == 'btn-open'
			) {
				// const length = obj.target.parentElement.parentElement.classList.length;
				let onOpen = true;
				for (
					let i = 0;
					i < obj.target.parentElement.parentElement.classList.length;
					i++
				) {
					const name = obj.target.parentElement.parentElement.classList[i];
					if (name == 'on') onOpen = false;
				}
				obj.target.parentElement.parentElement.parentElement.childNodes.forEach(
					(item) => {
						if (item.classList) item.classList.remove('on');
					},
				);

				if (onOpen)
					obj.target.parentElement.parentElement.classList.toggle('on');
			} else if (obj.target.tagName == 'STRONG') {
				let onOpen = true;
				for (
					let i = 0;
					i < obj.target.parentElement.parentElement.classList.length;
					i++
				) {
					const name = obj.target.parentElement.parentElement.classList[i];
					if (name == 'on') onOpen = false;
				}
				obj.target.parentElement.parentElement.parentElement.childNodes.forEach(
					(item) => {
						if (item.classList) item.classList.remove('on');
					},
				);

				if (onOpen)
					obj.target.parentElement.parentElement.classList.toggle('on');
			} else {
				// const length = obj.target.parentElement.classList.length;
				let onOpen = true;
				for (let i = 0; i < obj.target.parentElement.classList.length; i++) {
					const name = obj.target.parentElement.classList[i];
					if (name == 'on') onOpen = false;
				}
				obj.target.parentElement.parentElement.childNodes.forEach((item) => {
					if (item.classList) item.classList.remove('on');
				});

				if (onOpen) obj.target.parentElement.classList.toggle('on');
			}

			const param = {
				notiarclNo:
					obj.target.parentElement.getAttribute('data') ||
					obj.target.parentElement.parentElement.getAttribute('data'),
			};

			if (param.notiarclNo) {
				const apis = [
					{
						api: API.getModifyNoticeViewCount,
						data: param,
						callback: this.retrieveNoticeViewCountCallback,
					},
				];
				this.call(apis);
			}
		},

		getRegDt: function(regDt) {
			return DateUtil.getDateString(new Date(regDt));
		},

		// 공지사항 공지글 색상
		isSortSeq: function(sortSeq) {
			if (sortSeq === 0) return true;
			else return false;
		},

		isNew: function(regDt) {
			const d = parseInt(DateUtil.getGapTime(regDt, 'W'));
			if (d < 2) return true;
			else return false;
		},

		goPage: function(param) {
			this.notice.setting.page = param.page;
			this.getNoticeList();
		},

		getContent: function(value) {
			const expUrl = /(((http(s)?:\/\/)\S+(\.[^(\n|\t|\s,)]+)+)|((http(s)?:\/\/)?(([a-zA-z\-_]+[0-9]*)|([0-9]*[a-zA-z\-_]+)){2,}(\.[^(\n|\t|\s,)]+)+))+/gi;
			return value
				.replace(
					expUrl,
					'<a href="$&" style="color:blue" target="_blank"><u>$&</u></a>',
				)
				.replace(/(?:\r\n|\r|\n)/g, '<br />');
		},
	},
};
</script>
