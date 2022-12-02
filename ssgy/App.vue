<script>
	import {mapMutations} from 'vuex'
	export default {
		onLaunch: function() {
			const userInfo=uni.getStorageSync('userinfo');
			if(userInfo!==""){
				this.login(userInfo)
				this.user.userid=userInfo.userid
				this.user.username=userInfo.username
				this.state=true
			}
		}
		,
		methods:{
			...mapMutations(['login'])  
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 引入官方css库 */
	 @import './common/uni.css';
	 /* 引入自定义图标库 */
	 @import './common/icon.css';
	 /* 引入动画库 */
	 @import './common/animate.css';
	 page{
	 	background-color: #F9F9F9;
	 }
</style>
