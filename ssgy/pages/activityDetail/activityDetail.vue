<template>
	<view>
		<view class="all">
			<view class="title">主题：{{myData.name}}</view>
			<view class="name">
				<view><span class="mySpan">开始时间	</span> {{myData.start}}</view>
				<view><span class="mySpan">结束时间 </span> {{myData.end}}</view>
			</view>
			<view class="content">
				<h3 style="font-weight: 600;">活动内容</h3>
				<view class="contents">
					{{myData.content}}
				</view>
				
			</view>
			
			<view class="three">
				<uni-icons type="shop" color="orange" size="15"></uni-icons>
				<span class="myspan">QQ群：{{myData.QQnumber}}</span>
				<uni-icons type="calendar" color="orange" size="15"></uni-icons>
				<span class="myspans">活动时长： {{myData.duration}}h</span>
			</view>
			<view class="three">
				<uni-icons type="person" size="15" color="orange"></uni-icons>
				<span class="myspans">{{myData.publisher}}</span>
			</view>
			<view class="info">
				<view class="place">
					<uni-icons type="location-filled" size="15" color="orange"></uni-icons>
					<span class="myspans">{{myData.place}}</span>
				</view>
				
				<view class="choose">
					<view class="" v-if="state">
						<span class="concerned">已关注</span>
					</view>
					<view class="" v-else>
						<span class="stat" @click="concern">关注</span>
					</view>
				</view>
				
				
			</view>
			
<!-- 			<view class="time">
				<view><span class="begin">报名时间</span> {{myData.startRegistration}}</view>
				<view><span class="begin">截止时间 </span> {{myData.endRegistration}}</view>
			</view> -->
			
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import {mapMutations} from 'vuex'
	const db=uniCloud.database()
	export default {
		data() {
			return {
				id:'',
				userid:"",
				myData:{},
				disabled:true,
				currentTime:'',
				state:false
			}
		},
		onLoad(option) {
			this.id = option.id
			this.userid=option.userid
			this.init()
			// this.currentTime = new Date()
			// console.log(this.currentTime,'当前时间')
		},
		onPullDownRefresh() {
			// this.myData = []
			this.init()
			setTimeout(() => {
							//关闭下拉刷新
							uni.stopPullDownRefresh()
						},500)	
		},
		methods: {
			...mapMutations(['login']),
			init(){
				db.collection('activity').where('_id=="'+this.id+'"')
				.get()
				.then(
				(res) =>{
					this.myData=res.result.data[0]
					// console.log(res.result.data)
				})
				
				db.collection('concern').where('uid=="'+this.userid+'" && aid=="'+this.id+'"')
				.get()
				.then(
				(res) =>{
					console.log(res)
					if(res.result.data.length==1){
						this.state=true
					}
					else {
						this.state=false
					}
						
						
				})
				
			},
			concern(){

				let data={}
				let concernnum=this.myData.concernnum
				data["uid"]=this.userid
				data["aid"]=this.id
				// console.log(data)
				db.collection("activity")
				.where('_id=="'+this.id+'"')
				  .update({
				    concernnum: concernnum+1
				  })
				db.collection("concern")
					.add(data)
					.then((res) => {
							uni.showToast({
								title: '关注成功',
								icon:'success'
							})
						})
						.catch((err) => {
							uni.showModal({
								content: err.message || '关注失败',
								showCancel: false
							})
						})
			}
			
		},
		components:{
			uniIcons
		}
	}
</script>

<style scoped>
.all{
	background-color: white;
	width: 92%;
	margin: 20rpx auto;
	border-radius: 10rpx;
	position: relative;
	padding-bottom: 30rpx;
}
.all image{
	width: 690rpx;
	border-radius: 10rpx;
}
.title{
	font-size: 30rpx;
	font-weight: 600;
	margin: 20rpx 0 0 10rpx;
	padding-top: 10rpx;
}
.mytitle{
	font-size: 30rpx;
	color: #BBBBBB;
}
.myInfo{
	text-align: left;
	width: 60%;
	margin-right: 20rpx;
	font-size: 30rpx;
	margin: 10rpx 10rpx;
	color: #BBBBBB;
}
.name{
	margin: 10rpx 10rpx;
	color: #BBBBBB;
	position: relative;
	display: flex;
	flex-wrap: wrap;
}
.created{
	position: absolute;
	top: 0rpx;
	right: 20rpx;
	color: #BBBBBB;
}
.content{
	margin: 20rpx 10rpx;
}
.three{
	margin: 10rpx;
}
.info{
	margin: 10rpx;
	display: flex;
	justify-content: space-between;
}
.myspan{
	margin: 5rpx 60rpx 10rpx 5rpx;
}
.myspans{
	margin: 5rpx 60rpx 0 5rpx;
}
.btn{
	background-color: orange;
	font-size: 28rpx;
	width: 180rpx;
	height: 70rpx;
	line-height: 70rpx;
	margin-top: 40rpx;
	color: white;
	font-weight: 600;
}
.mySpan{
	color: orange;
	font-weight: 600;
	margin-right: 20rpx;
}
.time{
	margin: 10rpx 10rpx;
	color: #BBBBBB;
	position: relative;
	display: flex;
	flex-wrap: wrap;
}
.begin{
	color: orange;
	font-weight: 600;
	margin-right: 20rpx;
}
.myspan{
	margin: 5rpx 60rpx 10rpx 0;
}
.myspans{
	margin: 5rpx 60rpx 0 0;
}
.contents{
	background-color: #F9F9F9;
	width: 92%;
	margin: 10rpx auto;
	padding: 20rpx 0 20rpx 5rpx;
	border-radius: 10rpx;
}
.stat{
	color: red;
	font-size: 30rpx;
	margin-right: 30rpx;
}
.concerned{
	color: #BBBBBB;
	font-size: 30rpx;
	margin-right: 30rpx;
}
</style>
