<template>
	<view>
		<image src="../../static/logo.jpg" mode="widthFix"></image>
		<view class="content">
			<view class="service">服务</view>
			<view class="gridcss">
				<uni-grid :column="3">
				    <uni-grid-item @tap="gotoAll">
						<view class="icon iconfont icon-activity"></view>
				        <text class="text">全部活动</text>
				    </uni-grid-item>
					<uni-grid-item @tap="gotoShare">
						<view class="icon iconfont icon-pdongtai"></view>
					    <text class="text">发布动态</text>
					</uni-grid-item>
				    <uni-grid-item @tap='gotoPublish'>
						<view class="icon iconfont icon-publish"></view>
				        <text class="text">发布活动</text>
				    </uni-grid-item>
				</uni-grid>
			</view>
		</view>
		
		<!-- 活动列表 -->
		<view class="activitycss">
			<view class="service" id="myac">活动列表</view>
			<unicloud-db ref="udb" v-slot:default="{data,loading,error,options}" collection="activity" orderby="createTime desc">
				<view v-if="error">{{error.message}}</view>
				<view v-else>
					<view class="total" v-for="(item,index) in data" :key="index" @click='gotoDetail(item)'>
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
import uniGrid from "@/components/uni-grid/uni-grid.vue"
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
import {mapState,mapMutations} from 'vuex'
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
export default {
	data() {
		return {
			title: 'Hello',
			userid:'',
			myCode:'',
			sessionId:''
		}
	},

	onLoad(option) {
		this.id = option.id
		console.log(this.id)
		// this.sessionId = option.sessionId
		// this.init()
		// this.currentTime = new Date()
		// console.log(this.currentTime,'当前时间')
		this.init()
	},
	// 页面生命周期，下拉刷新后触发
	onPullDownRefresh() {
		this.$refs.udb.loadData({
			clear: true
		}, () => {
			// 停止下拉刷新
			uni.stopPullDownRefresh()
		})
	},
	computed: mapState(['hasLogin','uerInfo']),
	methods: {
		...mapMutations(['login']),
		init()
		{
			uni.getStorage({
				key: 'userInfo',
				success:(res) => {
					this.login(res.data);
					this.userid=res.data.userid
					console.log(this.userid)
				} 
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
		
		// 跳转至发布活动页面
		gotoPublish(){
			uni.navigateTo({
				url:'../publish/publish?sessionId='+this.sessionId
			})
		},
		
		// 跳转至动态页面
		gotoShare(){
			uni.navigateTo({
				url:'../commitShare/commitShare?sessionId='+this.sessionId
			})
		},
		
		// 跳转至全部活动页面
		gotoAll(){
			uni.navigateTo({
				url:'../activity/activity?userid='+this.userid
			})
		}
	},
	components: {
		uniGrid,
		uniGridItem,
		uniIcons
	}
}
</script>

<style scoped>
.content {
	background-color: white;
	width: 92%;
	margin: 20rpx auto;
	border-radius: 10rpx;
}
.gridcss{
	width: 90%;
	margin: 0 auto;
	padding: 20rpx 0;
	text-align: center;
}
.icon-pdongtai{
	color: orange;
}
.icon-activity{
	color: red;
}
.icon-publish{
	color: #E80080;
}
.icon{
	margin-top: 15rpx;
	font-size: 60rpx;
}
.service{
	width: 91.5%;
	font-size: 30rpx;
	font-weight: 600;
	margin-left: 35rpx;
}
.activitycss{
	width: 92%;
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
