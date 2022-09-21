<template>
	<view>
		<uni-search-bar @confirm="search" @cancel="cancel" :focus="true" v-model="keyWords"></uni-search-bar>

		<list :loading="loading" :listData="listData" />
	</view>
</template>

<script>
import List from './list.vue';
export default {
	components: {
		List
	},
	data() {
		return {
			keyWords: '',
			loading: false,
			listData: [],
			value: 1,
			options: [{ name: '博客', id: 'Blog' }, { name: '新闻', id: 'News' }, , { name: '博问', id: 'Question' }, , { name: '知识库', id: 'Kb' }],
			pageIndex: 1,
			pageSize: 10
		};
	},
	onLoad(e) {
		this.keyWords = e.keyWords
		this.search();
	},
	onPullDownRefresh() {
		this.pageIndex = 1;
		this.search();
	},
	onReachBottom() {
		this.pageIndex += 1;
		this.search();
	},
	methods: {
		cancel() {
			uni.navigateTo({
				url: '/pages/index/index'
			});
		},
		async search() {
			if (this.pageIndex === 1) this.loading = true;
			const data = await this.request({
				url: `/api/ZzkDocuments/${this.options[this.value].id}`,
				data: {
					keyWords: this.keyWords,
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
			});
			this.listData = this.pageIndex === 1 ? data : this.listData.concat(data);
			if (this.pageIndex === 1) this.loading = false;
		}
	}
};
</script>

<style></style>
