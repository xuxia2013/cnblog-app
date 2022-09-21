<template>
	<view class="">
		<view class="uni-tab">
			<view
				v-for="(tab, index) in tabBars"
				:key="tab.id"
				class="uni-tab-item"
				:class="tabIndex == index ? 'uni-tab-item-active' : ''"
				:id="tab.id"
				:data-current="index"
				@click="ontabtap(index)"
			>
				<text class="uni-tab-item-title">{{ tab.name }}</text>
			</view>
		</view>

		<uni-search-bar @confirm="search" v-model="keyword"></uni-search-bar>

		<swiper :current="tabIndex" style="flex: 1; height: calc(100vh - 100px);" :duration="300" @change="ontabchange">
			<swiper-item v-for="(tab, index) in tabBars">
				<view><list :loading="loading" :listData="listData" /></view>
			</swiper-item>
		</swiper>
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
			tabBars: [
				{
					id: 'home',
					name: '首页',
					requestUrl: '/api/blogposts/@sitehome'
				},
				{
					id: 'news',
					name: '新闻',
					requestUrl: '/api/NewsItems'
				},
				{
					id: 'good',
					name: '精华',
					requestUrl: '/api/blogposts/@picked'
				},
				{
					id: 'best',
					name: '推荐',
					requestUrl: '/api/newsitems/@recommended'
				},
				{
					id: 'hot',
					name: '热门',
					requestUrl: '/api/newsitems/@hot-week'
				}
			],
			keyword: '',
			tabIndex: 0,
			listData: [],
			loading: false,
			pageIndex: 1,
			pageSize: 10
		};
	},
	onLoad() {
		this.getList();
	},
	onPullDownRefresh() {
		this.pageIndex = 1;
		this.getList();
	},
	onReachBottom() {
		this.pageIndex += 1;
		this.getList();
	},
	onShareAppMessage() {
		return {
			title: '代码改变世界',
			path: '/pages/index/index',
			imageUrl: 'https://www.cnblogs.com/images/logo.svg?v=R9M0WmLAIPVydmdzE2keuvnjl-bPR7_35oHqtiBzGsM'
		};
	},
	onShareTimeline(){
		return {
			title: '代码改变世界',
			path: '/pages/index/index',
			imageUrl: 'https://www.cnblogs.com/images/logo.svg?v=R9M0WmLAIPVydmdzE2keuvnjl-bPR7_35oHqtiBzGsM'
		};
	},
	onAddToFavorites(){
		return {
			title: '代码改变世界',
			path: '/pages/index/index',
			imageUrl: 'https://www.cnblogs.com/images/logo.svg?v=R9M0WmLAIPVydmdzE2keuvnjl-bPR7_35oHqtiBzGsM'
		};
	},
	methods: {
		ontabchange(e) {
			let index = e.target.current || e.detail.current;
			this.ontabtap(index);
		},
		ontabtap(tabIndex) {
			this.tabIndex = tabIndex;
			this.pageIndex = 1;
			this.getList();
		},
		async getList() {
			if (this.pageIndex === 1) this.loading = true;
			const data = await this.request({
				url: this.tabBars[this.tabIndex].requestUrl,
				data: {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize
				}
			});
			this.listData = this.pageIndex === 1 ? data : this.listData.concat(data);
			if (this.pageIndex === 1) this.loading = false;
		},
		search(res) {
			this.keyword = '';
			uni.navigateTo({
				url: '/pages/index/search?keyWords=' + res.value
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	page {
	    width: 100%;
	    min-height: 100%;
	    display: flex;
	}
	
/deep/ .uni-navbar {
	z-index: 1000;
	top: 0;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	margin-top: 25px;
	background: white;
}
</style>
