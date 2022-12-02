<template>
	<view class="modify" :class="visible?'visible':'close'">
		<view class="mask" @tap="clickMask"></view>
		<view class="modifybox">
			<view class="titlebox">
				<view class="title">{{model=='name'?'修改昵称':'修改密码'}}</view>
			</view>
			<view class="inputbox" v-if="model=='name'">
				<view class="inputitem">
					<input type="text" v-model="name" placeholder="请输入新昵称" minlenth="2" maxlength="5">
				</view>
			</view>
			<view class="inputbox" v-if="model=='pwd'">
				<view class="inputitem">
					<input type="password" placeholder="旧密码" v-model="oldpwd" minlenth="5">
				</view>
				<view class="inputitem">
					<input type="password" placeholder="新密码" v-model="newpwd" minlenth="5">
				</view>
				<view class="inputitem">
					<input type="password" placeholder="新密码" v-model="reppwd" minlenth="5">
				</view>
			</view>
			<view class="prompt" v-if="prompt.length">
				{{prompt}}
			</view>
			<view class="btnbox">
				<view class="cannel" @tap="onCannel">取消</view>
				<view class="confirm" @tap="onConfirm">确认</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"",
				oldpwd:"",
				newpwd:"",
				reppwd:"",
				prompt:""
			};
		},
		props:{
			model:{ 
				type:String,
				default:()=>{
					return "name"
				}
			},
			visible:{
				type:Boolean,
				default:()=>{
					return false
				}
			}
		},
		methods:{
			onConfirm(){
				if(this.model=="name"){
					this.checkName()
				}
				if(this.model=="pwd"){
					this.checkPwd()
				}
			},
			onCannel(){
				this.$emit("update:visible",false)
			},
			clickMask(){
				this.$emit("update:visible",false)
			},
			// 检查昵称
			checkName(){
				if(this.name.length<2){
					this.prompt="昵称必须2-5个字符长度！！！"
					return;
				}else{
					this.prompt=""
					this.$emit("pubComment",this.name);
					this.$emit("update:visible",false)
				}
			},
			// 检查密码
			checkPwd(){
				if(this.oldpwd.length&&this.newpwd.length&&this.reppwd.length){
					if(this.oldpwd.length<5){
						this.prompt="原始密码输入错误！！！"
					}else if(this.newpwd!=this.reppwd){
						this.prompt="两次新密码输入不一致！！！"
					}else if(this.newpwd.length<5){
						this.prompt="密码长度至少5个字符！！！"
					}else if(this.oldpwd==this.newpwd){
						this.prompt="新旧密码一致，请修改！！！"
					}else{
						// 当满足以上条件时
						this.$emit("pubComment",{newpwd:this.newpwd,oldpwd:this.oldpwd});
						this.newpwd=""
						this.oldpwd=""
						this.reppwd=""
						this.prompt=""
						// this.$emit("update:visible",false)
					}
				}else{
					this.prompt="输入框不能为空！！！"
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modify{
		z-index: 999;
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		transition: 2s;
		.mask{
			position: absolute;
			z-index: 999;
			width: 100vw;
			height: 100vh;
			background: rgba(0,0,0,.2);
		}
		.modifybox{
			position: absolute;
			border-radius: 12rpx;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			z-index: 1000;
			width: 90vw;
			background: white;
			.titlebox{
				height: 80rpx;
				line-height: 80rpx;
				box-shadow: 0rpx 0px 18rpx 1rpx rgba(0,0,0,.3);
				text-align: center;
			}
			.inputbox{
				margin: 60rpx 50rpx 20rpx 50rpx;
				.inputitem{
					padding: 10rpx;
					height: 50rpx;
					border-radius: 12rpx;
					border: 2rpx solid $uni-text-color-grey;
					margin-top: 40rpx;
					input{
						margin-top: 6rpx;
						color:$uni-text-color-grey;
						font-size: $uni-font-size-base;
					}
				}
			}
			.prompt{
				font-size: 26rpx;
				color:red;
				text-align: center;
			}
			.btnbox{
				display: flex;
				justify-content: space-around;
				width: 70%;
				margin: 0rpx 15%;
				margin-top: 40rpx;
				padding-bottom: 30rpx;
				view{
					padding:20rpx 30rpx;
					font-size: 28rpx;
					text-align: center;
					color: white;
					border-radius: 12rpx;
				}
				.confirm{
					background: #004de7;
					opacity: .7;
				}
				.cannel{
					background: rgb(229, 63, 21);
					opacity: .7;
				}
			}
		}
	}
	.close{
		display: none;
		opacity: 0;
	}
	.visible{
		display: block;
		opacity: 1;
	}
</style>
