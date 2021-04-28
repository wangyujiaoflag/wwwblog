import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false, // 默认未登录
    
    userName: '不归少年',
    userRole: '0', // 0-管理员 1-普通用户
    userId: '12345',
    userInfo: {
      sex: '女',
      introduce: '好的坏的都是经历，加油少年',
    },
    roleList: [], // 普通用户：个人资料管理、评论管理、数据管理、博客管理、粉丝/关注管理、分类管理（自己的文章分类）
    token: '',
  },
  mutations: {
    // 设置登录状态
    setLoginInfo(state,{token,isLogin}) {
      state.token = token;
      state.isLogin = isLogin;
    }
  },
  actions: {
    SET_LoginInfo({commit}) {
      commit('setLoginInfo')
    }
  },
  modules: {
  }
})
