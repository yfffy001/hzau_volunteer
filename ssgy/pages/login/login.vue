<template>
	<view class="content">
		<view class="bigbox" >
			<view class="three">
				<view class="all">
					<view class="left">手机号</view>
					<input placeholder="请输入手机号" v-model="account" />
					<view class="left">密码</view>
					<input type="password" displayable v-model="password" placeholder="请输入密码"></input>
				</view>
			</view>
		</view>
		<view class="login">
			<button class="btn" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	import {
		univerifyLogin,
		univerifyErrorHandler
	} from '@/common/univerify.js'
	import {
		getDeviceUUID
	} from '@/common/utils.js'
	const db = uniCloud.database()
	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: '',
				username: '',
				userid:''
			}
		},
		methods: {
			...mapMutations(['login']),
			
			async bindLogin() {
				db.collection("user").where('account=="'+this.account+'" && password=="'+this.password+'"')
				.get()
				.then(
					(res) =>{
						let data=res.result.data[0]
						this.username=data.name
						this.userid=data._id
						let userInfo ={
							userid:this.userid,
							account: this.account,
							username:this.username,
							password:this.password
						}
						this.login(userInfo)
						setTimeout(() => {
							uni.switchTab({
								url: '../index/index?userid='+this.userid
							})	
							
									
						},1000)	
						
						uni.showToast({
								title:'登录成功',
								icon:'success'
							})		
						
					}
				)
				.catch((err) => {
					console.log("err.messsage")
					console.log(err.messsage)
					uni.showModal({
						content: '账号或密码错误',
						showCancel: false
					})
				})
				
			}
		}
	}
</script>

<style>

	.action-row {
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #BBBBBB;
		padding: 0 10px;
	}
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