<template>
	<view class="space">

		<view class="navBar1">
			志愿圈
			<view class="textpic">
				<navigator url="../commitShare/commitShare">
					<button class="addbu">
						<image src="../../static/add.png" mode="aspectFit" class="add"></image>
					</button>
				</navigator>
			</view>
		</view>

		<view class="navBar2"></view>

		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="Share" orderby="date desc">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<view class="itemList" v-for="item in data" :key="item._id">
					<!-- 头像，姓名 -->
					<view class="headPic">
						<image src="/static/my1.png" mode="aspectFit"></image>
						<text>
							{{item.name}}
						</text>
					</view>
					<!-- 文本 -->
					<view class="contentText">
						<text class="conTextPar" :user-select="true">
							{{item.content}}
						</text>
					</view>
					<!-- 图片 -->
					<view class="contentImage">
						<view class="image_item" v-for="imagesrc in item.imagelist " :key="">
							<image @tap="previewImg(imagesrc)" class="conPic" :src="imagesrc" mode="aspectFill"></image>
						</view>
					</view>
					<!-- 时间 和 点赞功能 -->
					<view class="contentBottom">
						<view class="time">{{item.date}} {{item.address}}</view>
						<!-- 点赞和评论功能 -->
						<view class="operaBox">
							<button class="operaIconBu">
								<image class="operaIcon" src="../../static/images/commitImages/operator.png"></image>
							</button>
							<view class="box_panel_wrap">
								<view class="box-panel animate__animated animate__bounceInRight">
									<!-- 点赞和取消 -->
									<view class="like_box">
										<!-- 显示一个喜欢的图标 -->
										<view class="like_icon"></view>
										<!-- <view class="like_text" >赞</view>
										<view class="like_text" >取消</view> -->
									</view>
									<!-- 发表评论 -->
									<view class="comment_box">
										<view class="comment_icon"></view>
										<!-- <view class="comment_text">评论</view> -->
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 赞和评论展示 -->
					<view class="commentList">
						<!-- 赞的展示区域 -->
						<view class="likeContent">
							<!-- 赞的图标 -->
							<image class="likeHeartIcon" src="../../static/images/commitImages/点赞.png"></image>
							<!-- 赞的作者 -->
							<text class="likeNickname">
								你猜
							</text>
						</view>
						<!-- 评论展示区域 -->
						<view class="commentItem">
							<!-- 评论作者 -->
							<text class="commentNickname">
								你猜:
							</text>
							<!-- 评论内容 -->
							<text>
								真好看
							</text>
						</view>

					</view>
				</view>
			</view>
		</unicloud-db>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				myData: [],
				sessionId: '',
				src:''
			}
		},
		onLoad() {

		},
		// 页面生命周期，下拉刷新后触发
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				// 停止下拉刷新
				uni.stopPullDownRefresh()
			})
		},
		// computed: ,
		methods: {
			previewImg(src) {
				let imgsArray = [];
				imgsArray[0] = src;
				uni.previewImage({
					urls: imgsArray,
					current: 0,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	view {
		font-size: 30rpx;
	}
	.navBar1 {
		height: 64rpx;
		width: 100%;
		text-align: center;
		line-height: 200%;
		border-bottom: solid 1rpx #d9d9d9;
		position: fixed;
		background-color: white;
		z-index: 100;

		.textpic {
			height: 64rpx;
			width: 64rpx;
			float: right;

			.addbu {
				height: 64rpx;
				width: 64rpx;
				padding: 0;
				border-radius: 50%;

				.add {
					align-items: center;
					height: 64rpx;
					width: 64rpx;

				}
			}

		}
	}

	.navBar2 {
		width: 100%;
		height: 64rpx;
		background-color: #FFFFFF;
		opacity: 1;
	}

	.itemList {
		width: 100%;
		border-bottom: solid 1rpx #d9d9d9;
		box-sizing: border-box;

		.headPic {
			padding: 4rpx;

			.headPicNav {
				display: inline;
			}
		}

		.headPic image {
			height: 70rpx;
			width: 70rpx;
			border-radius: 50%;
		}

		.contentText {
			padding: 10rpx;

			.conTextPar {
				display: block;
				font-family: "STXinwei";
				font-size: 35rpx;
			}

		}

		.contentImage {
			padding: 4rpx;
			.image_item {
				overflow: hidden;
				display: inline;
				position: relative;
				.conPic {
					margin: 2rpx;
					width: calc((100vw - 40rpx) / 3);
					height: calc((100vw - 40rpx) / 3);
				}
			}
			
		}

		.contentBottom {
			padding: 4rpx;

			.time {
				padding-left: 5rpx;
				font-size: 25rpx;
				display: inline;
			}

			.operaBox {
				display: inline;
				float: right;

				.operaIconBu {
					width: 55rpx;
					height: 45rpx;
					padding: 0;
					background-color: white;
				}

				.operaIcon {
					padding-right: 5rpx;
					margin-bottom: 24rpx;
					width: 55rpx;
					height: 45rpx;
				}
			}
		}

		.commentList {
			padding: 8rpx;
			width: 100%;

			.likeContent {
				height: 45rpx;
				margin-bottom: 10rpx;
				border-radius: 80rpx;
				background-color: #efefef;

				.likeHeartIcon {
					width: 35rpx;
					height: 35rpx;
				}
			}

			.commentItem {

				height: 80rpx;
				margin-bottom: 10rpx;
				border-radius: 80rpx;
				background-color: #efefef;
			}
		}


	}
</style>
