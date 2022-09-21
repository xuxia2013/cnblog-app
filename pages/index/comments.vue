<template>
	<view class="comment">
		<view class="icon">
			<view class="item">
				<uni-icons type="hand-up" size="20" color="#8f8f94"></uni-icons>
				<text>{{ item.DiggCount || item.VoteTimes || 0 }}</text>
			</view>
			<view class="item">
				<uni-icons type="chat" size="20" color="#8f8f94"></uni-icons>
				<text>{{ item.CommentCount || item.CommentTimes || 0 }}</text>
			</view>
			<view class="item">
				<uni-icons type="eye" size="20" color="#8f8f94"></uni-icons>
				<text>{{ item.ViewCount || item.ViewTimes || 0 }}</text>
			</view>
		</view>

		<view class="comment-box" v-if="comment.length">
			<view v-for="(item, index) in comment" :key="index" class="comment-item">
				<view class="comment-title">
					<image class="comment-img" :src="item.FaceUrl || 'https://pic.cnblogs.com/avatar/simple_avatar.gif'"></image>
					<view style="flex: 1">
						<text>{{ item.Author }}</text>
						<text style="float: right;font-size: small;">{{ util.setDate(item.DateAdded) }}</text>
					</view>
				</view>
				<view class="comment-content"><u-parse :content="item.Body" noData="正在加载中..." /></view>
			</view>
		</view>
	</view>
</template>

<script>
import uParse from '@/components/gaoyia-parse/parse.vue';

export default {
	props: ['item'],
	components: {
		uParse
	},
	data() {
		return {
			loading: false,
			comment: []
		};
	},
	created() {
		this.getComment();
	},
	methods: {
		async getComment() {
			if (!this.item.CommentCount) return;
			this.loading = true;
			this.comment = await this.request({
				url: `/api/blogs/${this.item.BlogApp}/posts/${this.item.Id}/comments`,
				data: {
					pageIndex: 1,
					pageSize: this.item.CommentCount
				}
			});
			this.loading = false;
		}
	}
};
</script>

<style lang="scss" scoped></style>
