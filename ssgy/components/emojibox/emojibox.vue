<template>
	<view class="emoji" :animation="animationData">
		<view class="box">
			<view class="emojibox">
				<view class="outbox">
					<view class="innerbox">
						<view class="line" v-for="(item, index) in emojiArr" :key="index + '1'">
							<view class="column" @tap="getEmoji(item2)" v-for="(item2, index2) in item" :key="index2 + '2'">{{ item2 }}</view>
						</view>
					</view>
				</view>
				<view class="delete" @tap="deleteContent">
					<view><image src="./images/delete.png" mode="widthFix"></image></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			animationData: {},
			show: false,
			emojiArr: [
				['๐', '๐', '๐', '๐คฃ', '๐', '๐', '๐'],
				['๐', '๐', '๐', '๐', '๐', '๐', '๐'],
				['๐', '๐', '๐', '๐', '๐', '๐ค', '๐'],
				['๐', '๐ฃ', '๐ฅ', '๐ฎ', '๐ค', '๐ฏ', '๐ถ'],
				['๐ช', '๐ซ', '๐ด', '๐', '๐', '๐คค', '๐'],
				['๐', '๐', '๐', '๐', '๐ค', '๐', '๐'],
				['๐', '๐ค', '๐ญ', '๐จ', '๐ฐ', '๐ฌ', '๐ต'],
				['๐ฑ', '๐ก', '๐ท', '๐', '๐ป', '๐', '๐'],
				['๐ฉ', '๐', '๐', '๐', '๐ช๐ป', 'โ๐ป', 'โ๐ผ'],
				['๐ค๐ป', '๐ค๐ผ', '๐๐ป', 'โ๐ป', '๐๐ผ', '๐๐ป', '๐๐ป'],
				['๐๐ป', '๐ค', '๐', '๐ฒ', '๐ฆ', '๐ฐ'] //'๐',
			]
		};
	},
	methods: {
		// ็นๅป่กจๆ
		getEmoji(emoji) {
			this.$emit('addEmoji', emoji);
		},
		// ๅ ้ค
		deleteContent() {
			this.$emit('deleteContent');
		},
		// ๅจ็ป
		showEmoji() {
			this.show = !this.show;
			var animation = uni.createAnimation({
				duration: 400,
				timingFunction: 'ease'
			});
			if (this.show) {
				animation.height('260rpx').step();
			} else {
				animation.height('0rpx').step();
			}
			this.animationData = animation.export();
		}
	}
};
</script>

<style lang="scss" scoped>
.emoji {
	height: 0rpx;
	overflow: hidden;
	margin: 0 30rpx;
	.box {
		position: relative;
		width: 92vw;
	}
}
.emojibox {
	border-radius: 10rpx;
	padding-top: 20rpx;
	background: #f5f5f5;
	position: absolute;
	width: 100%;
	.outbox {
		width: 100%;
		height: 240rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		overflow-y: auto;
		.innerbox {
			width: 90%;
			height: 100%;
			.line {
				display: flex;
				width: 100%;
				padding-bottom: 16rpx;
				.column {
					font-size: 50rpx;
					width: 14.2%;
					text-align: center;
				}
			}
		}
	}

	.delete {
		position: absolute;
		bottom: 10rpx;
		right: 50rpx;
		view {
			height: 70rpx;
			width: 70rpx;
			background: #f5f5f5;
			image {
				width: 70rpx;
				height: auto;
			}
		}
	}
}
</style>
