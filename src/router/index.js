import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from './route'
import storage from '@/util/cookie'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
//路由拦截器 路由重定向
router.beforeEach((to, from, next) => {
  let token = storage.get('TOKEN');
  if(to.path=="/login" || to.path == "/changePassword") {
    next();
  } else {
    if(!token) {
      next("/login");
    } else {
      // 检查token的有效期，过期重定向到登录界面 
      // token 放在全局state里面，记录有效期时间 ，判断时间 然后。。。
      next();
      // next({ // 路由重定向
      //   path: '',
      //   query: {redirect: to.fullPath}
      // })
    }
  }
  
});
export default router;
