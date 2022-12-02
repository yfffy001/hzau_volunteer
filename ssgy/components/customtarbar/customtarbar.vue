<template>
	<view class="combox">
		<view class="left">
			<slot name="left"></slot>
		</view>
		<view class="center"><slot name="center"></slot></view>
		<view class="right"><slot name="right"></slot></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.combox {
	height: 88rpx;
	width: 100%;
	display: flex;
	.left {
		height: 88rpx;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.center {
		height: 88rpx;
		flex: 7;
	}
	.right {
		height: 88rpx;
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
