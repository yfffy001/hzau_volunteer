<template>
	<view>
		<view class="center">
			<view class="logo" @click="bindLogin" :hover-class="!hasLogin ? 'logo-hover' : ''">
				<view class="logo-title">
					<text class="uer-name">Hi，{{state ? user.username : '您还未登录哦~'}}</text>
				</view>
			</view>
			<view class="six">
				<view class="one"><text class="mytext">我的记录</text></view>
				<view class="containerBox-icon">
<!-- 					<view class="icon iconfont icon-paimai3" @tap='gotoBuy'></view> -->
					<view class="icon iconfont icon-activity" @tap='publish'></view>
					
					<!-- <view class="icon iconfont icon-buoumaotubiao40" @tap='buyCar'></view> -->
					<view class="icon iconfont icon-concern" @tap='concern'></view>
					<view class="icon iconfont icon-dongtai" @tap='gotodynamic'></view>
				</view>
				<view class="containerBox">
<!-- 					<view class="myrecord" @tap='gotoBuy'></view> -->
					<view class="myrecord" @tap='publish'>我发布的</view>
					
					<!-- <view style="transform: translateX(10rpx);" @tap='buyCar'>购物车</view> -->
					<view @tap='concern'>我关注的</view>
					<view style="transform: translateX(5rpx);" @tap='gotodynamic'>我的动态</view>
				</view>	
			</view>

			<view class="mylist">
				<view class="one"><text class="mytext">我的资料</text></view>
				<uni-list>
					<uni-list-item title="身份认证" @tap="gotoIdentify"></uni-list-item>
					<uni-list-item title="认证资料" @tap="gotoPersonDetail"></uni-list-item>
					<uni-list-item title="修改个人资料" @tap="person"></uni-list-item>
				</uni-list>
				<view class="none"></view>
			</view>

		</view>
	</view>
</template>

<script>
import uniBadge from "@/components/uni-badge/uni-badge.vue"
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import {mapState,mapMutations} from 'vuex'
import {
		univerifyLogin
	} from '@/common/univerify.js'
export default{
	data(){
		return{
			showView:true,
			user:{
				username:'',
				userid:''
			},
			state:false
		}
	},
	
	onLoad() {
		this.init()
	},
	computed: mapState(['hasLogin','uerInfo']),  
	methods:{
		...mapMutations(['login']),
		bindLogin() {
			if (!this.state) {
					uni.navigateTo({
						url: '../login/login',
					});
			}
		},
		// 登录信息渲染
		init(){
			uni.getStorage({
				key: 'userInfo',
				success:(res) => {
					this.login(res.data);
					this.user.userid=res.data.userid
					this.user.username=res.data.username
					this.state=true
				} 
			})
		},
		
		// 提示先登录
		stopSwitch(){
			uni.showToast({
				title:'请先登录',
				icon:'none'
			})
		},
		
		// 跳转至身份验证页面
		gotoIdentify(){
			uni.navigateTo({
				url:'../checkIdentify/checkIdentify?sessionId='+this.sessionId
			})
		},
		
		// 跳转至资料认证页面
		gotoPersonDetail(){
			uni.navigateTo({
				url:'../personDetail/personDetail?sessionId='+this.sessionId
			})
		},
		
		// 修改个人信息
		person(){
			uni.navigateTo({
				url:'../information/information?sessionId='+this.sessionId 
			})
		},
		
		// 跳转至我发布的活动的页面
		publish(){
			uni.navigateTo({
				url:'../published activity/published activity?sessionId='+this.sessionId
			})
		},
		
		// 跳转至我的动态页面
		gotodynamic() {
			uni.navigateTo({
				url: '../myShare/myShare'
			})
		},
		
		// 跳转至关注页面
		concern(){
			uni.switchTab({
				url:'../concern/concern?sessionId='+this.sessionId
			})
		}
	},
	components:{
		uniBadge,
		uniList,
		uniListItem,
		uniPopup
	}
}
</script>

<style scoped>
.center {
		flex-direction: column;
	}
.logo {
		width: 750rpx;
		height: 240rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background-color:  #06c05f;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 150rpx;
	}

	.logo-title {
		height: 150rpx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20rpx;
		margin-top: 50rpx;
		font-size: 50rpx;
		font-weight: 600;
	}

	.uer-name {
		height: 60rpx;
		line-height: 60rpx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		color: #FFFFFF;
	}

	.login-title {
		height: 150rpx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20rpx;
	}
.header{
	width: 92%;
	background-color: #ffd33f;
	margin: 30rpx auto;
	border-radius: 10rpx;
}
.header image{
	width: 150rpx;
	height: 150rpx;
	margin: 35rpx;
	border-radius: 50%;
	border: 10rpx #FFB400 solid;
	position: relative;
}
.myphone{
	position: absolute;
	top: 80rpx;
	left: 300rpx;
	font-size: 35rpx;
}
.mygender{
	position: absolute;
	top: 150rpx;
	left: 300rpx;
	font-size: 35rpx;
}
.containerBox{
	display: flex;
	width: 100%;
	margin-bottom: 20rpx;
	justify-content: space-around;
}
.containerBox-icon{
	display: flex;
	width: 100%;
	margin-top: 20rpx;
	text-align: center;
	font-size: 40rpx;
	justify-content: space-around;
}
.containerBox-badge{
	display: flex;
	width: 100%;
	margin-top: 20rpx;
	justify-content: space-around;	
}
.icon-shanchu{
	position: absolute;
	right: 0;
	top: -10;
	color: red;
}
.twocon{
	 display: flex; 
	 flex-wrap: nowrap;
	 margin-top: 20rpx;
}
.mylist{
	width: 92%;
	margin: 30rpx auto;
	background-color: white;
	border-radius: 10rpx;
}
.six{
	width: 92%;
	margin: 30rpx auto;
	border-radius: 10rpx;
	padding-bottom: 10rpx;
	background-color: white;
}
.icon{
	font-size: 60rpx;
}
.icon-paimai3,.icon-huodong{
	font-size: 55rpx;
	transform: translateY(10rpx);
}
.none{
	width: 100%;
	height: 5rpx;
}
.one{
	font-size: 30rpx;
	font-weight: 600;
	border-bottom: 2rpx solid #EEEEEE;
}
.mytext{
	margin: 30rpx;
}
</style>
