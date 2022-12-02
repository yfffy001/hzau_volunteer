<template>
	<view class="space">
		<view class="navBar1">
			详情
			<view class="textpic">
				<navigator url="../commitShare/commitShare">
					<button class="addbu">
						<image src="../../static/images/dynamic.png" mode="aspectFit" class="add"></image>
					</button>
				</navigator>
			</view>
		</view>

		<view class="navBar2"></view>

		<view class="itemList" v-for="item in myData">

			<view class="headPic">
				<image src="/static/my1.png" mode="aspectFit"></image>
				<text>
					{{item.name}}
				</text>
			</view>

			<view class="contentText">
				<text class="conTextPar" :user-select="true">
					{{item.content}}
				</text>
			</view>

			<view class="contentImage">
				<view class="image_item" v-for="imagesrc in item.imagelist " :key="">
					<image @tap="previewImg(imagesrc)" class="conPic" :src="imagesrc" mode="aspectFill"></image>
				</view>
			</view>

			<view class="contentBottom">
				<view class="time">{{item.date}}</view>
				<view class="operaBox">
					<button class="operaIconBu">
						<image class="operaIcon" src="../../static/images/commitImages/operator.png">
						</image>
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
			<view class="commentList">
				<!-- 赞的展示区域 -->
				<view class="likeContent">
					<!-- 赞的图标 -->
					<image class="likeHeartIcon" src="../../static/images/commitImages/点赞.png"></image>
					<!-- 赞的作者 -->
					<text class="likeNickname">
						纠结伦、王峰
					</text>
				</view>
				<!-- 评论展示区域 -->
				<view class="commentItem">
					<!-- 评论作者 -->
					<text class="commentNickname">
						纠结伦:
					</text>
					<!-- 评论内容 -->
					<text>
						文案怎么这么熟悉？o.O
					</text>

				</view>
			</view>
            
			<view class="bottom">
				<button class="update" @click="goto()">修改</button>
				<button class="delete" @click="Delete(item._id)">删除</button>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				myData: [],
				id: "",
			}
		},
		onLoad(id) {
			this.id = id.id;
			console.log(this.id)
			this.init();
		},
		onPullDownRefresh() {
			this.myData = []
			this.init()
			setTimeout(() => {
							//关闭下拉刷新
							uni.stopPullDownRefresh()
						},500)	
		},
		// computed: mapState(['hasLogin','uerInfo']), 
		methods: {
			init() {
				const db = uniCloud.database();
				db.collection('Share').where('_id =="' + this.id + '"').get().then((res) => {
					this.myData = res.result.data;
				})
			},
			goto() {
				uni.navigateTo({
					url:"/pages/updateShare/updateShare?id="+this.id,
				});
			},
			Delete(id) {
				const db = uniCloud.database();
				db.collection("Share").where('_id=="' + id + '"').remove();
				uni.showModal({
					title: '提示',
					content: '删除成功',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.navigateBack(1);
						} else if (res.cancel) {
							console.log('用户点击取消');
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

		.dyimage {
			height: 60rpx;
			width: 60rpx;
			margin-top: 1rpx;
		}

		.dyimage image {
			height: 60rpx;
			width: 60rpx;
			margin-top: 1rpx;
		}

		.textpic {
			height: 80rpx;
			width: 80rpx;
			float: right;
			margin-right: 10rpx;

			.addbu {
				height: 64rpx;
				width: 64rpx;
				padding: 0;

				.add {
					align-items: center;
					height: 64rpx;
					width: 64rpx;
					border-radius: 50%;
				}
			}

		}
	}

	.navBar2 {
		width: 100%;
		height: 64rpx;
		align-items: center;
	}

	.itemList {
		width: 100%;
		border-bottom: solid 1rpx #d9d9d9;
		box-sizing: border-box;

		.emojiPic {
			padding: 1rpx;

			.emoPic {
				margin: 1rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}

		.headPic {
			padding: 8rpx;

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
			padding: 20rpx;
			font-family: "STXinwei";
			.conTextPar {
				display: block;
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
				height: 40rpx;
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
		
		.bottom {
			display: flex;
			font-family: "STXinwei";
			.update {
				background-color: greenyellow;
			}
			.delete {
				background-color: red;
			}
		}
		.bottom button {
			font-size: 25rpx;
		}

	}
	
</style>
