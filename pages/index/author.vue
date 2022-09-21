<template>
	<view>
		<view class="banner">
			<image class="banner-img" :src="item.Avatar"></image>
			<view>
				<view class="banner-title">{{ author.title }}</view>
				<view class="banner-subtitle"><u-parse :content="author.subtitle" /></view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value, key) in listData" :key="key">
				<view class="uni-media-list" @click="goDetail(value)">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{ value.Title }}</view>
						<view class="uni-media-list-text-center">{{ value.Description }}...</view>
						<view class="uni-media-list-text-bottom">
							<text>{{ util.setDate(value.PostDate) }}</text>
							<view class="icon">
								<uni-icons type="hand-up" size="12" color="#8f8f94"></uni-icons>
								<text>{{ value.DiggCount }}</text>
								<uni-icons type="chat" size="12" color="#8f8f94"></uni-icons>
								<text>{{ value.CommentCount }}</text>
								<uni-icons type="eye" size="12" color="#8f8f94"></uni-icons>
								<text>{{ value.ViewCount }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-loading" v-show="loading">加载中...</view>
	</view>
</template>

<script>
import uParse from '@/components/gaoyia-parse/parse.vue';

export default {
	components: {
		uParse
	},
	data() {
		return {
			loading: false,
			item: null,
			author: null,
			listData: [],
			pageIndex: 1
		};
	},
	async onLoad(event) {
		this.item = JSON.parse(event.item);
		uni.setNavigationBarTitle({
			title: this.item.Author
		});
		await this.getAuthor();
		this.getAuthorBlogs();
	},
	onReachBottom() {
		this.pageIndex += 1;
		this.getAuthorBlogs();
	},
	onShareAppMessage() {
		return {
			title: this.item.Author,
			path: '/pages/index/author?item=' + JSON.stringify(this.item),
		};
	},
	onShareTimeline() {
		return {
			title: this.item.Author,
			path: '/pages/index/author',
			query: 'item=' + JSON.stringify(this.item),
		};
	},
	onAddToFavorites() {
		return {
			title: this.item.Author,
			path: '/pages/index/author',
			query: 'item=' + JSON.stringify(this.item),
			imageUrl: this.item.Avatar
		};
	},
	methods: {
		async getAuthor() {
			const res = await this.request({
				url: `/api/blogs/${this.item.BlogApp}`
			});
			this.author = res;
		},
		goDetail: function(item) {
			uni.navigateTo({
				url: '/pages/index/details?item=' + JSON.stringify({
					...item,
					Description: null
				})
			});
		},
		async getAuthorBlogs() {
			if (this.author && this.listData.length >= this.author.postCount) return;
			const res = await this.request({
				url: `/api/blogs/${this.item.BlogApp}/posts`,
				data: {
					pageIndex: this.pageIndex
				}
			});
			this.listData = this.pageIndex === 1 ? res : this.listData.concat(res);
		}
	}
};
</script>

<style lang="scss" scoped></style>
