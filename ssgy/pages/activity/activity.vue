<template>
	<view>
		<view class="content">
			<!-- 头部 -->
			<view class="search_box">
				<input class="search" confirm-type="search" placeholder="请输入活动名称或发布方" placeholder-style="font-size: 30rpx" v-model="inputcontent"/>
				<view class="pic">
					<image src="../../static/search.png" mode="aspectFit"/>
				</view>
			</view>
			<view class="btn">
				<button @click="getKey">搜索</button>
			</view>
			<view class="activitycss">
				<unicloud-db v-slot:default="{data,loading,error,options}" collection="activity" :where="where" >
					<view v-if="error">{{error.message}}</view>
					<view v-else>
						<view class="total" v-for="(item,index) in data" :key="index" @click="gotoDetail(item)">
							<view class="name">
								<uni-icons type="flag" color="red" size="15"></uni-icons>
								<span class="duration">{{item.duration}}小时</span>
								<span >{{item.name}}</span>
							</view>
							<view class="time">
								<uni-icons type="calendar" color="red" size="15"></uni-icons>
								<span>开始时间：{{item.start}}</span>
							</view>
							<view class="time">
								<uni-icons type="calendar-filled" color="red" size="15"></uni-icons>
								<span>结束时间：{{item.end}}</span>
							</view>
							<view class="info">
								<view class="">
									<uni-icons type="staff-filled" color="red" size="15"></uni-icons>
									<span>发布方：{{item.publisher}}</span>
								</view>
								<view class="">
									<uni-icons type="fire" color="red" size="15"></uni-icons>
									<span>{{item.concernnum}}人关注</span>
								</view>
							</view>
						</view>
					</view>
				</unicloud-db>
			</view>
			
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			userid:'',
			inputcontent:'',
			keystr:''
		}
	},
	onLoad(option) {
		this.userid = option.userid
	},
	computed: {
		where() {
	      return `${new RegExp(this.keystr, 'i')}.test(name) || ${new RegExp(this.keystr,'i')}.test(publisher)` // 使用计算属性得到完整where
	    }
	},
	methods:{
		onInput(e){
			this.inputcontent = e.target.value;
			// console.log(this.inputcontent);
		},
		getKey(){
			this.keystr = this.inputcontent;
			if (!this.keystr) {
				uni.showToast({
				    title:"请输入...", 
					duration: 2000
				})
				return;
			}
			console.log(this.keystr);
			// this.inputcontent = '';
		},
		// 提示先登录
		stopSwitch(){
			uni.showToast({
				title:'请先登录',
				icon:'none'
			})
		},
		
		// 跳转至登录页面
		gotoLogin(){
			uni.navigateTo({
				url:'../login/login'
			})
		},
		
		// 跳转至活动详情页
		gotoDetail(item){
			let id = item._id
			console.log(item._id)
			uni.navigateTo({
				url:'../activityDetail/activityDetail?id='+item._id+'&&userid='+this.userid
			})
		},
	},
}
</script>

<style scoped>
.search_box{
	width: 550rpx;
	height: 60rpx;
	border: 1rpx solid #ccc;
	background-color: #f2f2f5;
	margin: 15rpx 8rpx;
	border-radius: 30rpx;	
}
.search{
	outline: none;
	border: none;
	float: left;
	outline: 0;
	width: 500rpx;
	height: 60rpx;
	margin-left: 50rpx;
}
.pic{
	align-items: cneter;
	height: 32rpx;
	width: 32rpx;
	float: left;
	margin-left: 10rpx;
	margin-top: -48rpx;
}
.pic image{
	height: 32rpx;
	width: 32rpx;
}
.btn{
	height: 60rpx;
	width: 150rpx;
	float: right;
	margin-right: 10rpx;
	margin-top: -32px;

}
.btn button{
	font-size:12px;
	font-weight: 500;
	color:white;
	background-color: #06c05f;

}
.activitycss{
	width: 95%;
	background-color: white;
	margin: 20rpx auto;
	padding-bottom: 20rpx;
	border-radius: 10rpx;
}
.total{
	display: flex;
	flex-wrap: wrap;
	width: 92%;
	margin: 0 auto;
	padding: 20rpx 0;
	border-bottom: 2rpx solid #EEEEEE;
	margin-top: 10rpx;
	align-items: flex-start;
}
.name {
	font-size: 30rpx;
	font-weight: 600;
	width: 100%
}
.duration {
	color: orangered;
	font-size: 20rpx;
	background-color: bisque;
	margin-left: 5rpx;
	
}
.time {
	font-size: 25rpx;
	color: #BBBBBB;
	margin-left: 100rpx;
	margin-top: 5rpx;
	
}
.info {
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-top: 10rpx;
}
</style>

