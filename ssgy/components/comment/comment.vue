<template>
	<view class="comment_box" :animation="animationData">
		<view class="comment_top">
			<view class="textarea_box">
				<textarea  @focus="show('close')" v-model="content" auto-height="true" placeholder="评论" />
			</view>
			<view class="switch">
				<view class="emoji_keypress" v-if="isEmoji" @tap="show">
					<image src="../../static/images/chat/emoji.png" mode="widthFix"></image>
				</view>
				<view class="emoji_keypress" v-else @tap="show">
					<image src="../../static/images/chat/keypress.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="btn">
				<view @tap="send">
					<view :class="content.length>0?'active':''">发送</view>
				</view>
			</view>
		</view>
		<view class="emojibox">
			<view class="outbox">
				<view class="innerbox">
					<view class="line" v-for="(item, index) in emojiArr" :key="index + '1'">
						<view class="column" @tap="getEmoji(item2)" v-for="(item2, index2) in item" :key="index2 + '2'">{{ item2 }}</view>
					</view>
				</view>
			</view>
			<view class="delete" @tap="deleteContent">
				<view>
					<image src="./images/delete2.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			content:"",
			isEmoji:true,
			animationData:{},
			emojiArr: [
				['😀', '😁', '😂', '🤣', '😃', '😃', '😅'],
				['😄', '😆', '😉', '😊', '😋', '😎', '😍'],
				['😎', '😘', '😗', '😙', '🙂', '🤗', '😑'],
				['😏', '😣', '😥', '😮', '🤐', '😯', '😶'],
				['😪', '😫', '😴', '😌', '😛', '🤤', '🙄'],
				['😒', '😓', '😕', '🙃', '🤑', '🙁', '😚'],
				['😖', '😤', '😭', '😨', '😰', '😬', '😵'],
				['😱', '😡', '😷', '💀', '👻', '💍', '💄'],
				['💩', '👑', '🎓', '👀', '💪🏻', '☝🏻', '✌🏼'],
				['🤘🏻', '🤙🏼', '👌🏻', '✊🏻', '👍🏼', '👎🏻', '👏🏻'],
				['🙏🏻', '🤝', '🍖', '🍲', '🍦', '🍰']  //'🍔',
			]
		};
	},
	created() {},
	methods:{
		// 动画
		show(str) {
			if(str&&str=="close"){
				if(this.isEmoji==true){
					return ;
				}else{
					this.isEmoji=true
				}
			}else{
				this.isEmoji=!this.isEmoji
			}
			var animation = uni.createAnimation({
				duration: 200,
				timingFunction: 'ease'
			});
		
			if (this.isEmoji) {
				// console.log("收起来了")
				animation.bottom('-360rpx').step();
			} else {
				// console.log("弹起来了")
				animation.bottom('0rpx').step();
			}
			this.animationData = animation.export();
		},
		// 点击表情
		getEmoji(emoji){
			this.content+=emoji
		},
		// 删除
		deleteContent(){
			this.content = this.content.slice(0,this.content.length-1)
		},
		// 发送
		send(){
			if(this.content.length==0){
				uni.showToast({
					title:"不能发送空评论",
					icon:"none",
					duration:1000
				})
			}else{
				this.$emit("comment",this.content)
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.comment_box {
	width: 100vw;
	position: fixed;
	bottom: -360rpx;
	left: 0;
	z-index: 99999;
	padding-bottom: env(safe-area-inset-bottom);;
	.comment_top{
		padding: 20rpx 40rpx;
		display: flex;
		background: #ebebeb;
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		.textarea_box{
			max-height:158rpx;
			width: 90%;
			flex: 7;
			margin-right: 10rpx;
			border-radius: 10rpx;
			background: #ffffff;
			overflow: hidden;
			padding: 14rpx 20rpx;
			box-sizing: border-box;
			textarea{
				width: 100%;
				font-size: 34rpx;
				color: #464646;
			}
		}
		.switch{
			flex: 1;
			margin: 0rpx 10rpx;
			position: relative;
			.emoji_keypress{
				position: absolute;
				bottom: 0rpx;
				height: 70rpx;
				width: 70rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 66rpx;
					height: 66rpx;
				}
			}
		}
		.btn{
			flex: 2;
			margin-left: 20rpx;
			position: relative;
			view{
				position: absolute;
				bottom: 0rpx;
				height: 70rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius:10rpx;
				view{
					background: #ccc;
					width: 100%;
					height: 100%;
					font-size: 32rpx;
					color: white;
				}
				.active{
					background: #0bb019;
				}
			}
			
		}
	}
	.emojibox {
		padding-top: 20rpx;
		background: #dedede;
		position: relative;
		.outbox{
			width: 100%;
			height: 340rpx;
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
		
		.delete{
			position: absolute;
			bottom: 10rpx;
			right: 50rpx;
			view{
				height: 70rpx;
				width: 70rpx;
				background: #dedede;
				image{
					width:70rpx;
					height: auto;
				}
			}
		}
	}
}

</style>
