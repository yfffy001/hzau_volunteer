<template>
	<view>
		<view class="all" >
			<view class="concern">已关注</view>
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
									<view class="stat" @click="cancel(item._id)">取消关注</view>
								</view>
							</view>
					</view>
				</unicloud-db>
			</view>
		</view>
	</view>
</template>

<script scoped>
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
			// this.$refs.udb.loadData({
			// 	clear: true
			// }, () => {
			// 	// 停止下拉刷新
			// 	uni.stopPullDownRefresh()
			// })
			// this.getlist()
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
				db.collection('concern').where('uid=="'+this.userid+'"')
				.get()
				.then(
				(res) =>{
					var tmp=res.result.data
					// console.log(tmp)
					tmp.forEach((item,index)=>{
					      for (const key in item) {
					        // console.log("item[key]",item[key]);//值
					        // console.log("key",key);//键
							if(key=="aid")
							{
								this.aid.unshift(item[key])
							}
					      }
					    })
					
					// console.log(this.aid)
				}
				)
				
			},
			async find(id){
				let res=db.collection("activity").where('_id=="'+id+'"').get()
				.then(
				(res)=>{
					this.myData=res.result.data[0]
					this.num=this.myData.concernnum
				})
				return res
			},
			async update(id){
				let res=db.collection("activity").where('_id=="'+id+'"')
					.update({
						concernnum: this.num-1
					})
					return res
			},
			async cancel(id) {
				try{
					let res1=await this.find(id);
					let res2=await this.update(id);
					
					// console.log(this.num)
					// console.log("num")

					db.collection("concern").where('uid=="'+this.userid+'" && aid=="'+id+'"').remove();
					uni.showToast({
						title:'取关成功',
						icon:'success'
					})
					this.update(id)
					
				}catch(e){
					uni.showToast({
						title:'取关失败',
						icon:'error'
						
					})
					console.log(e.message)
				}
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
		components: {
			uniGrid,
			uniGridItem
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
	padding-bottom: 20rpx;
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
.title{
	font-size: 30rpx;
	font-weight: 600;
	margin: 20rpx 0 0 10rpx;
	padding-top: 10rpx;
	width: 100%;
}
.mname{
	width: 100%;
	display: flex;
	flex-wrap: nowrap;
	justify-content: flex-start;
	margin: 10rpx 10rpx;
}
.mytitle{
	font-size: 30rpx;
	color: #BBBBBB;
}
.myInfo{
	text-align: left;
	width: 145rpx;
	/* margin-right: 10rpx; */
	font-size: 30rpx;
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
.created{
	top: 100rpx;
	right: 100rpx;
	color: #BBBBBB;
}
.myspan{
	color: orange;
	font-size: 30rpx;
	font-weight: 500;
}
.stat{
	color: red;
	font-size: 30rpx
}
.concern{
	width: 91.5%;
	font-size: 30rpx;
	font-weight: 600;
}
</style>
