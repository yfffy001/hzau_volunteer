<template>
	<view>
		<view class="logo">
			<image src="../../static/logo.jpg" mode="widthFix"></image>
		</view>
		<view class="ShareList" @tap="gotocommitShare()">
			<view class="shareDate">
				{{date}}
			</view>
			<view class="shareImage">
				<uni-icons type="plusempty" size="40"></uni-icons>
			</view>
			<view class="shareText">
				<textarea>

				</textarea>
			</view>
		</view>
		<view class="ShareList" v-for="item in myData" @tap="gotoShareDetail(item._id)">
			<view class="shareDate">
				{{item.date}}
			</view>
			<view v-if="item.imagelist.length != 0 " class="shareImage">
				<image :src="item.imagelist[0]" mode="aspectFill"></image>
			</view>
			<view v-else class="shareImage">
				<image src="../../static/logo.jpg" mode="aspectFill"></image>
			</view>
			<view class="shareText">
				<textarea>
				{{item.content}}
				</textarea>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				myData: [],
				date: "",
				userid: ""
			};
		},
		onLoad(option) {
			this.init()

		},
		onPullDownRefresh() {
			this.myData = []
			this.date = []
			this.init()
			setTimeout(() => {
				//关闭下拉刷新
				uni.stopPullDownRefresh()
			}, 500)
		},
		methods: {
			...mapMutations(['login']),
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data);
						this.userid = res.data.userid
						console.log(res.data)
					}
				})
				const db = uniCloud.database();
				db.collection('Share').where('uid=="' + this.userid + '"').orderBy('date', 'desc').get().then((res) => {
					this.myData = res.result.data;
				})
				this.date = this.dateTime();
			},
			dateTime() {
				let now = new Date();
				//获取now具体时间
				let nh = now.getHours();
				let nn = now.getMinutes();
				let nY = now.getFullYear();
				let nM = now.getMonth();
				let nD = now.getDate();
				let M = "";
				let D = "";
				let h = "";
				let n = "";
				if (nM < 10) {
					M = '0' + nM;
				} else {
					M = nM;
				}
				if (nD < 10) {
					D = '0' + nD;
				} else {
					D = nD;
				}
				if (nh < 10) {
					h = '0' + h;
				} else {
					h = nh;
				}
				if (nn < 10) {
					n = '0' + nn;
				} else {
					n = nn;
				}
				return nY + '年' + M + '月' + D + '日 ' + h + ":" + n;
			},
			gotocommitShare() {
				uni.navigateTo({
					url: '/pages/commitShare/commitShare'
				})
			},
			gotoShareDetail(id) {
				uni.navigateTo({
					url: '/pages/myShareDetail/myShareDetail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.ShareList {
		width: 100%;
		height: 150rpx;
		margin: 10rpx;
		display: flex;

		.shareDate {
			width: 25%;
			font-size: 25rpx;
			font-family: "STXinwei";
		}

		.shareImage {
			width: 25%;
			margin-left: 20rpx;
		}

		.shareImage image {
			width: 100%;
			height: 100%;
		}

		.shareText {
			width: 40%;
			margin-left: 20rpx;
			// white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 30rpx;
		}

		.shareText textarea {
			width: 100%;
			height: 150rpx;

			display: -webkit-box;
			/*弹性伸缩盒子模型显示*/
			-webkit-box-orient: vertical;
			/*排列方式*/
			-webkit-line-clamp: 3;
			/*显示文本行数(这里控制多少行隐藏)*/
		}
	}
</style>
