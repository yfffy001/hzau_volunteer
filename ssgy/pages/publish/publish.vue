<template>
	<view>
		<template>
			<view class="bigBox">
				<view class="three">
					<view class="all">
						<view class="left">活动名称</view>
						<input placeholder=" " v-model="name" />
						<view class="left">活动地点</view>
						<input placeholder=" " v-model="place" />
						<view class="left">活动时间</view>
						<span>开始：{{datetimerange[0]}}</span>
						<span class="end">结束：{{datetimerange[1]}}</span>
						<view class="box">
							<!-- <uni-section  type="line"></uni-section> -->
							<view class="example-body">
								<uni-datetime-picker v-model="datetimerange" type="datetimerange" rangeSeparator="至" :border="false" :clearIcon="false"/>
							</view>
						</view>
						<view class="left">活动时长</view>
						<input type="number" placeholder="请输入阿拉伯数字" v-model="duration"/><span>h</span>
						<view class="left">活动人数</view>
						<input type="number" placeholder="请输入阿拉伯数字" v-model="number" />
						<view class="left">发布人</view>
						<input placeholder=" " v-model="publisher" />
						<view class="left">活动群号</view>
						<input placeholder="请输入活动QQ群号" v-model="QQnumber" />
						<view class="left">活动内容</view>
						<uni-easyinput type="textarea" :inputBorder="false" maxlength=50 placeholder="输入字数不超过50字" v-model="content" ></uni-easyinput>
					</view>
				</view>

				<view class="popImage">
					<button class="btn" @tap='save'>发布</button>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
var sourceType = [
	['camera'],
	['album'],
	['camera', 'album']
]
var sizeType = [
	['compressed'],
	['original'],
	['compressed', 'original']
]
import {mapState,mapMutations} from 'vuex'
const db = uniCloud.database();

	export default {
		data() {
			return {
				userid:'',
				
				single: '',
				datetimesingle: '',
				range: ['2022-11-1', '2023-1-1'],
				datetimerange: [],
				
				name:'',
				place: '',
				duration: '',
				number: '',
				start:'' ,
				end: '',
				publisher: '',
				content: '',
				concernnum: 0,
				QQnumber:'',
				aid:''
				
				           
			}
		},
		watch: {
			datetimesingle(newval) {
				console.log('单选:', this.datetimesingle);
			},
			range(newval) {
				console.log('范围选:', this.range);
			},
			datetimerange(newval) {
				console.log('范围选:', this.datetimerange);
			}
		},
		mounted() {
			setTimeout(() => {
				this.datetimesingle = Date.now() - 2*24*3600*1000
				this.single = '2022-11-29'
				this.datetimerange = ["2022-11-29 15:00:00", "2022-12-1 23:59:59"]
			},3000)
			this.init()
		},
		onLoad(option){
			this.init()
			// this.sessionId = option.sessionId
		},
		onInput(e){
			this.name = e.target.value;
			this.place = e.target.value;
			this.duration = e.target.value;
			this.number = e.target.value;
			this.publisher = e.target.value;
			this.content = e.target.value;
			this.QQnumber = e.target.value;
			
			// console.log(this.inputcontent);
		},
		methods: {
			...mapMutations(['login']),
			init(){
				uni.getStorage({
					key: 'userInfo',
					success:(res) => {
						this.login(res.data);
						this.userid=res.data.userid
						console.log(res.data)
					} 
				})
			},
			// 保存信息
			async save(){
				if(this.name=='' || this.place=='' || this.publisher=='' || this.duration=='' || this.number=='' || this.content=='' || this.datetimerange[0]=='' || this.datetimerange[1]==''|| this.QQnumber==''){
					uni.showToast({
						title:'请补全信息',
						icon:'error'
					})
					
				}
				else if(isNaN(Number(this.duration))){
					uni.showToast({
						title:'活动时长错误',
						icon:'error'
					})
				}
				else if(isNaN(Number(this.number))){
					uni.showToast({
						title:'活动人数错误',
						icon:'error'
					})
				}
				else if(isNaN(Number(this.QQnumber))){
					uni.showToast({
						title:'活动群号错误',
						icon:'error'
					})
				}
				else{
					let data = {}
					data["name"]=this.name
					data["place"]=this.place
					data["duration"]=Number(this.duration)
					data["number"]=Number(this.number)
					data["publisher"]=this.publisher
					data["content"]=this.content
					data["start"]=this.datetimerange[0]
					data["end"]=this.datetimerange[1]
					data["concernnum"]=this.concernnum
					data["createTime"]=Date.now()
					data["uid"]=this.userid
					data["QQnumber"]=Number(this.QQnumber)
					console.log(Date.now())
					await db.collection("activity")
						.add(data)
						.then((res) => {
							uni.showToast({
								title: '发布成功',
								icon:'success'
							})
							console.log(res)
							this.aid=res.result.id
							this.name=''
							this.place=''
							this.duration=''
							this.number=''
							this.publisher=''
							this.content=''
							this.QQnumber=''
							this.datetimerange=["2022-11-29 15:00:00", "2022-11-29 15:00:00"]
							setTimeout(()=> {
								uni.switchTab({
									url:'../index/index'
								}
								)
							})
						})
						.catch((err) => {
							uni.showModal({
								content: err.message || '发布失败',
								showCancel: false
							})
						})
					let publish={}
					// console.log("aid")
					// console.log(this.aid)
					publish["uid"]=this.userid
					publish["aid"]=this.aid
					db.collection("published").add(publish)
					console.log(publish)
				}
			},
			change(e) {
				this.single = e
				console.log('change事件:', this.single = e);
			},
			changeLog(e) {
				console.log('change事件:', e);
			},
			maskClick(e){
				console.log('maskClick事件:', e);
			}
		}
	}
</script>

<style scoped>
.all{
	margin: 30rpx;
	border-bottom: 2rpx solid #EEEEEE;
	display: flex;
	flex-wrap: wrap;
}
.left{
	margin-bottom: 30rpx;
	margin-right: 100rpx;
	width: 200rpx;
}

.btn{
	background-color:  #06c05f;
	font-size: 28rpx;
	width: 160rpx;
	height: 70rpx;
	line-height: 70rpx;
	margin-top: 40rpx;
	color: white;
	font-weight: 600;
}
.three{
	background-color: white;
	width: 92%;
	border-radius: 10rpx;
	padding: 20rpx 0;
	margin: 20rpx auto;
}
.myspan{
	color: #BBBBBB;
	margin-left: 20rpx;
}
.example-body {
	/* margin-left: -40rpx; */
	margin: 5rpx;
	width: 100%
}
.end {
	margin-left: 300rpx;
}

</style>
