<template>
	<view>
		<view class="article-title"><u-parse :content="item.Title" /></view>
		<view class="article-meta">
			<text class="article-author" v-if="item.Author || item.UserName" @click="goAuthor()">{{ item.Author || item.UserName }}</text>
			<view>
				<text class="article-text" v-if="item.Author">发表于</text>
				<text class="article-time" v-if="item">{{ util.setDate(item.PostDate || item.DateAdded || item.PublishTime) }}</text>
			</view>
		</view>
		<view class="article-content" v-if="!loading">
			<u-parse
				:content="content"
				@preview="preview"
				noData="正在加载中..."
				:imageProp="{
					lazyLoad: true
				}"
			/>
			<view class="article-url" v-if="item.Url || item.Uri">原文链接：{{ item.Url || item.Uri }}</view>
		</view>

		<comments :item="item" v-if="!loading" />
		
		<ad adpid="1144718907" type="banner"></ad>

	</view>
</template>

<script>
import parseHtml from '@/common/html-parser.js';
import uParse from '@/components/gaoyia-parse/parse.vue';
import comments from './comments.vue';

export default {
	components: {
		uParse,
		comments
	},
	data() {
		return {
			loading: false,
			item: null,
			content: null
		};
	},
	onLoad(event) {
		this.item = JSON.parse(event.item);
		this.getDetail();
	},
	onShareAppMessage() {
		return {
			title: this.item.Title,
			path: '/pages/index/details?item=' + JSON.stringify(this.item),
			// query: 'item=' + JSON.stringify(this.item),
		};
	},
	onShareTimeline() {
		return {
			title: this.item.Title,
			path: '/pages/index/details',
			query: 'item=' + JSON.stringify(this.item),
		};
	},
	onAddToFavorites() {
		return {
			title: this.item.Title,
			path: '/pages/index/details',
			query: 'item=' + JSON.stringify(this.item),
		};
	},
	methods: {
		preview(src, e) {
			//事件：点击富文本里的图片
		},
		goAuthor: function() {
			uni.navigateTo({
				url: '/pages/index/author?item=' + JSON.stringify(this.item)
			});
		},
		async getDetail() {
			this.loading = true;
			this.content = await this.request({
				url: this.item.BlogApp ? `/api/blogposts/${this.item.Id}/body` : `/api/newsitems/${this.item.Id}/body`
			});
			this.loading = false;
		}
	}
};
</script>

<style lang="scss" scoped></style>
