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
			<view class="three">
				<uni-icons type="location-filled" size="15" color="orange"></uni-icons>
				<span class="myspans">{{myData.place}}</span>
			</view>
			<!-- <view class="time">
				<view><span class="begin">报名时间</span> {{myData.startRegistration}}</view>
				<view><span class="begin">截止时间 </span> {{myData.endRegistration}}</view>
			</view> -->
			
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				id:'',
				myData:{},
				disabled:true,
				currentTime:''
			}
		},
		onLoad(option) {
			this.id = option.id
			console.log(this.id)
			this.init()
		},
		methods: {
			init(){
				const db = uniCloud.database()
				db.collection('activity').where('_id=="'+this.id+'"')
				.get()
				.then(
				(res) =>{
					this.myData=res.result.data[0]
					console.log(res.result.data)
				}
				)
			},
			
			
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
	margin: 20rpx auto;
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
.three{
	margin: 10rpx;
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
</style>
