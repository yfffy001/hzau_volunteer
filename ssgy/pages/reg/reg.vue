<template>
	<view class="content">
		<view class="three">
			<view class="all">
				<view class="left">用户名</view>
				<input placeholder="请输入用户名" v-model="username" />
				<view class="left">手机号</view>
				<input placeholder="请输入11位手机号" v-model="phonenumber" />
				<view class="left">密码</view>
				<input type="password" displayable v-model="password" placeholder="请输入密码(不少于6位)"></input>
				<view class="left">确认密码</view>
				<input type="password" displayable v-model="confirmPassword" placeholder="请确认密码"></input>
			</view>
		</view>
		<view class="reg">
			<button class="btn" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue';
	const db = uniCloud.database();
	export default {
		components: {
			mInput
		},
		data() {
			return {
				username: '',
				password: '',
				confirmPassword: '',
				phonenumber:''
			}
		},
		methods: {
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.phonenumber.length != 11) {
					uni.showToast({
						icon: 'error',
						title: '手机号长度错误'
					});
					return;
				}
				if (this.username.length > 15) {
					uni.showToast({
						icon: 'error',
						title: '用户名长度错误'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'error',
						title: '密码长度错误'
					});
					return;
				}
				if (this.password !== this.confirmPassword) {
					uni.showToast({
						icon: 'error',
						title: '密码输入不一致'
					});
					return;
				}

				const data = {
					
					'name': this.username,
					'password': this.password,
					'account':this.phonenumber
				}
				db.collection("user")
					.add(data)
					.then((res) => {
						uni.showToast({
							title: '注册成功',
							icon:'success'
						})
						this.phonenumber=''
						this.username=''
						this.account=''
						this.password=''
						this.confirmPassword=''
						setTimeout(() => {
							uni.navigateTo({
								url: '../login/login'
							})	
							
									
						},1000)	

					})
					.catch((err) => {
						uni.showModal({
							content: err.message || '注册失败',
							showCancel: false
						})
					})
				
			}
		}
	}
</script>

<style>
	.three{
		background-color: white;
		width: 92%;
		border-radius: 10rpx;
		padding: 20rpx 0;
		margin: 40rpx auto;
	}
	.left{
		margin-bottom: 30rpx;
		margin-right: 100rpx;
		width: 200rpx;
	}
	.all{
		margin: 30rpx;
		border-bottom: 2rpx solid #EEEEEE;
		display: flex;
		flex-wrap: wrap;
	}
	.btn{
		background-color: #06c05f;
		font-size: 28rpx;
		width: 160rpx;
		height: 70rpx;
		line-height: 70rpx;
		margin-top: 40rpx;
		color: white;
		font-weight: 600;
	}
</style>
