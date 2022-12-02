<template>
	<view class="content">

		<comtarbar class="comtarbar">
			<template #right>
				<view v-if="flag == false " class="btn" @tap="uploadImg()">更新图</view>
				<view v-else class="btn" @tap="published()">发表</view>
			</template>
		</comtarbar>

		<view class="edit_box">
			<view class="textarea-box">
				<textarea v-model="content" placeholder="请输入文字" />
			</view>
			<view class="e_title">
				<view class="title">
					添加图片
				</view>
				<view v-if="imglist.length > 2">
					<view class="btn" @tap="deleteAll">
						移除全部
					</view>
				</view>
			</view>

			<view class="imagebox">
				<view class="image_item" v-for="(item, index) in imglist" :key="index">
					<image @tap="previewImg(index)" class="c_image" :src="item" mode="aspectFill"></image>
					<image @tap="deleteImg(index)" class="yc" src="../../static/images/edit/yc.png" mode="widthFix">
					</image>
				</view>
				<view class="image_item" v-if="imglist.length < 9" @tap="choose">
					<image class="c_image" src="../../static/images/group/addimage.png" mode="widthFix"></image>
				</view>
			</view>

			<view class="e_title">
				<view class="title">
					添加位置
				</view>
			</view>
			<view class="localtion">
				<view class="localtion_btn" @tap="getLocaltion()">
					定位
				</view>
				<view v-if="address != '' " class="address">
					{{ address }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../api/request.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				content: '',
				imglist: [],
				address: '',
				name: '',
				uid: '',
				myData: [],
				list: [],
				flag: false,
				id:''
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.init();
		},
		methods: {
			...mapMutations(['login']),
			init() {
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data);
						this.uid = res.data.userid
						console.log(res.data)
					}
				})
				const db = uniCloud.database();
				db.collection('Share').where('_id =="' + this.id + '"').get().then((res) => {
					this.myData = res.result.data[0];
					// console.log(this.myData);
					this.content = this.myData.content;
					this.address = this.myData.address;
					this.name = this.myData.name;
					this.imglist = this.myData.imagelist;
				})
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
			// 选择图片
			choose() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera '], //从相册选择
					success: res => {
						res.tempFilePaths.map(item => {
							if (this.imglist.length < 9) {
								this.imglist.push(item);
							}
							return item;
						});
					}
				});
			},
			// 移除图片
			deleteImg(index) {
				this.imglist.splice(index, 1);
			},
			// 移除全部图片
			deleteAll() {
				this.imglist = [];
			},
			// 预览图片
			previewImg(index) {
				uni.previewImage({
					urls: this.imglist,
					current: index,
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
			},
			// 获取位置
			getLocaltion() {
				uni.chooseLocation({
					success: res => {
						this.address = res.address;
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				});
			},
			uploadImg() {
				// 如果有图片
				let list = [];
				let len = this.imglist.length;
				console.log(len);
				for (let i = 0; i < len; i++) {
					console.log(i);
					uniCloud.uploadFile({
						filePath: this.imglist[i],
						cloudPath: Date.now() + '.png',
						success(res) {
							let imgUrl = res.fileID
							list.push(imgUrl);
							// console.log(list);
							// console.log(len)
						},
						fail: function(err) {
							console.log(err.errMsg)
						},
						complete() {}
					});
				}
				console.log(list);
				for (let i = 0; i < len; i++) {
					if (i < len - list.length) {
						this.list.push(this.imglist[i]);
					} else {
						this.list.push(list[i - list.length]);
					}

				}

				this.flag = true;
				uni.showModal({
					title: '提示',
					content: '更新图片成功',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});


			},
			// 发布动态
			async published() {
				console.log(this.list);
				const db = uniCloud.database();
				db.collection('Share').where('_id=="' + this.id + '"').update({
					"name": this.name,
					"content": this.content,
					"date": this.dateTime(),
					"address": this.address,
					"imagelist": this.list,
					"uid": this.uid,
				}).then(e => {
					console.log(e);
				})
				uni.showModal({
					title: '提示',
					content: '更新成功',
					success: function(res) {
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
	};
</script>

<style lang="scss" scoped>
	.comtarbar {
		background: #ffffff;
		position: fixed;
		right: 0;
		left: 0;
		height: 88rpx;
		z-index: 1001;

		.title {
			line-height: 88rpx;
			padding: 0rpx 20rpx;

			view {
				display: inline-block;
			}
		}

		.info {
			width: 60rpx;
			height: 88rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 100%;
				height: auto;
			}
		}

		.btn {
			height: 60rpx;
			width: 100rpx;
			background: #37a603;
			font-size: 32rpx;
			color: white;
			line-height: 60rpx;
			text-align: center;
			border-radius: 10rpx;
		}
	}

	.edit_box {
		padding: 0rpx 20rpx;
		padding-top: 100rpx;
		height: calc(100vh - 100rpx);
		background: #f4f4f4;

		.textarea-box {
			margin-top: 20rpx;
			padding: 10rpx 20rpx;
			height: 400rpx;
			background: #ffffff;
			border-radius: 10rpx;

			textarea {
				font-size: 32rpx;
			}
		}

		.e_title {
			padding: 30rpx 0rpx 20rpx 0rpx;
			font-size: 34rpx;
			display: flex;
			justify-content: space-between;

			.btn {
				font-size: 32rpx;
				color: red;
			}
		}

		.imagebox {
			display: flex;
			flex-wrap: wrap;

			.image_item {
				height: calc((100vw - 40rpx) / 5);
				width: calc((100vw - 40rpx) / 5);
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;

				.c_image {
					width: 96%;
					height: 96%;
				}

				.yc {
					position: absolute;
					width: 30rpx;
					height: auto;
					right: 4rpx;
					top: 4rpx;
				}
			}
		}

		.localtion {
			display: flex;

			.localtion_btn {
				font-size: 30rpx;
				margin-left: 20rpx;
				margin-right: 40rpx;
				width: 80rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				background: #25940c;
				border-radius: 10rpx;
				color: white;
			}

			.address {
				width: calc(100% - 140rpx);
				font-size: 32rpx;
				color: #787878;
			}
		}
	}
</style>
