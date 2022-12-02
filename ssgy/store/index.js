import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {  
        userInfo: {},  
        hasLogin: false  
    },
    mutations: {
        login(state, user) {//改变登录状态  
            state.hasLogin = true
            state.userInfo.username = user.username  
            state.userInfo.account = user.account
			state.userInfo.password = user.password
			state.userInfo.userid = user.userid
            uni.setStorage({//将用户信息保存在本地  
                key: 'userInfo',  
                data: user
            })
        },  
        logout(state,user) {//退出登录  
            state.hasLogin = false  
            state.uerInfo = {}  
            uni.removeStorage({
                key: 'userInfo'  
            })  
        }  
    }  
});

export default store