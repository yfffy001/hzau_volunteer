<template>
	<view class="top-bar">
		<view class="top-bar-left">
			<slot></slot>
		</view>
		<view class="top-bar-right">
			<view class="search" @tap="toSearch"><image src="../../static/images/index/search.png"></image></view>
			<view class="add"><image src="../../static/images/index/add.png"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		//跳转到搜索页面
		toSearch: function() {
			uni.navigateTo({
				url: '../search/search'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.top-bar {
	border-bottom: 1px solid $uni-border-color;
	padding-top: var(--status-bar-height);
	display: flex;
	// background:rgba(255,255,255,0.96);
	// border-bottom:1px solid $uni-border-color;
	.top-bar-left {
		flex: 1;
	}
	.top-bar-right {
		flex: 1;
		//border: 1px solid #000;
		//background: #eee;
		text-align: right;
		padding-right: 10rpx;
		.search {
			width: 88rpx;
			height: 88rpx;
			display: inline-block;
			//border: 1px solid red;
		}
		.add {
			width: 88rpx;
			height: 88rpx;
			padding-right: 14rpx;
			display: inline-block;
			//border: 1px solid red;
		}
		.text {
			font-size: $uni-font-size-lg;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 88rpx;
			//background: #aaa;
			padding-right: $uni-spacing-col-base;
		}
		image {
			padding: 18rpx 0 0 18rpx;
			width: 52rpx;
			height: 52rpx;
		}
		.more-img {
			height: 88rpx;
			padding-top: 10rpx;
			padding-right: $uni-spacing-col-base;
			image {
				width: 52rpx;
				height: 12rpx;
			}
		}
	}
}
</style>
