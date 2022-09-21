<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value, key) in listData" :key="key">
				<view class="uni-media-list" @click="goDetail(value)">
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">
							<u-parse :content="value.Title" v-if="value.PublishTime" />
							<text v-else>{{ value.Title }}</text>
						</view>

						<view class="uni-media-list-text-center">
							<image
								v-if="value.Avatar || value.TopicIcon"
								class="uni-media-list-logo"
								mode="aspectFit"
								:src="value.Avatar || value.TopicIcon"
								@click.stop="goAuthor(value)"
							></image>
							<u-parse :content="value.Content" v-if="value.PublishTime" />
							<text v-else>{{ value.Description || value.Summary }}</text>
						</view>
						<view class="uni-media-list-text-bottom">
							<text v-if="value.Author || value.UserName" @click.stop="goAuthor(value)">
								<text style="margin-right: 10upx;">{{ value.Author || value.UserName }}</text>
								<text>{{ util.setDate(value.PostDate || value.DateAdded || value.PublishTime) }}</text>
							</text>

							<view class="icon">
								<uni-icons type="hand-up" size="12" color="#8f8f94"></uni-icons>
								<text>{{ value.DiggCount || value.VoteTimes || 0 }}</text>
								<uni-icons type="chat" size="12" color="#8f8f94"></uni-icons>
								<text>{{ value.CommentCount || value.CommentTimes || 0 }}</text>
								<uni-icons type="eye" size="12" color="#8f8f94"></uni-icons>
								<text>{{ value.ViewCount || value.ViewTimes || 0 }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uParse from '@/components/gaoyia-parse/parse.vue';

export default {
	props: ['listData'],
	components: {
		uParse
	},
	data() {
		return {};
	},
	methods: {
		goDetail: function(item) {
			uni.navigateTo({
				url: '/pages/index/details?item=' + JSON.stringify({
					...item,
					Description: null
				})
			});
		},
		goAuthor: function(item) {
			uni.navigateTo({
				url: '/pages/index/author?item=' + JSON.stringify({
					...item,
					Description: null
				})
			});
		}
	}
};
</script>

<style></style>
