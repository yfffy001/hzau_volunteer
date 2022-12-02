<template>
<view>	
	<view class="all">
		<view class="publish">已发布</view>
		<view class="" v-for="(id,i) in aid">
			<unicloud-db ref='udb' v-slot:default="{data,loading,error,options}" collection="activity" orderby="createTime desc" :where="`_id=='${id}'`">
				<view v-if="error">{{error.message}}</view>
				<view v-else>
						<view class="total" v-for="(item,index) in data" :key="index" @click="gotoDetail(item)">
							<view class="title">
								<uni-icons type="flag" color="red" size="15"></uni-icons>
								<span style="margin-left: 20rpx;">{{item.name}}</span>
							</view>
							<!-- <view class="created">已关注</view> -->
							<view class="time">
								<view>开始时间：<span class="myspan">{{item.start}}</span></view>
								<view>结束时间：<span class="myspan">{{item.end}}</span></view>
							</view>
							<view class="name">
								<view>发布方：<span>{{item.publisher}}</span></view>
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
	const db=uniCloud.database()
	export default {
		data() {
			return {
				userid:"",
				myData:[],
				aid:[],
				num:0
			}
		},
		onLoad(option) {
			this.init()
		},
		// 页面生命周期，下拉刷新后触发
		onPullDownRefresh() {
			this.aid=[]
			this.init()
			setTimeout(() => {
				//关闭下拉刷新
				uni.stopPullDownRefresh()
			},500)	
		},
		methods: {
			...mapMutations(['login']),
			// 页面渲染
			init(){
				uni.getStorage({
					key: 'userInfo',
					success:(res) => {
						this.login(res.data);
						this.userid=res.data.userid
						console.log(res.data)
					} 
				})
				console.log("userid")
				console.log(this.userid)
				db.collection('published').where('uid=="'+this.userid+'"')
				.get()
				.then(
				(res) =>{
					var tmp=res.result.data
					// console.log(tmp)
					tmp.forEach((item,index)=>{
					      for (const key in item) {
							if(key=="aid")
							{
								this.aid.unshift(item[key])
							}
					      }
					    })
				})
				
			},
			// 跳转至活动详情页
			gotoDetail(item){
				uni.navigateTo({
					url:'../pactivitydetail/pactivitydetail?id='+item._id
				})
			},
		},
		components: {
			uniGrid,
			uniGridItem
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
.all{
	background-color: white;
	width: 92%;
	margin: 20rpx auto;
	border-radius: 10rpx;
	position: relative;
	padding-bottom: 20rpx;
}

.title{
	font-size: 30rpx;
	font-weight: 600;
	margin: 0 0 0 10rpx;
	padding-top: 10rpx;
}

.value {
	width:75%;
	display:inline-block;
	white-space: pre-wrap; 
	word-wrap: break-word;
	height: auto;
}
.name{
	width: 95%;
	display: flex;
	flex-wrap: nowrap;
	margin: 10rpx 10rpx;
	justify-content: space-between;
}
.time{
	margin-left: 100rpx;
}
.stat{
	position: absolute;
	top: 40rpx;
	right: 20rpx;
	color: white;
	background-color: red;
	padding: 5rpx 20rpx;
	border-radius: 20rpx;
}
.created{
	margin: 10rpx 10rpx;
	color: #BBBBBB;
}	
.myspan{
	color: orange;
	font-size: 30rpx;
	font-weight: 500;
}
.publish{
	width: 91.5%;
	font-size: 30rpx;
	font-weight: 600;
}
</style>
