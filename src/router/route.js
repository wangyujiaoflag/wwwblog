
import Home from '../views/Home.vue'
export const routes = [
  {
    path: '/',
    name: 'Home', // 主页
    component: Home,
  },
  {
    path: '/write',
    name: 'write', // 写文章
    component: () => import(/* webpackChunkName: "write" */ '../views/write.vue')
  },
  {
    path: '/arcticle',
    name: 'arcticle', // 文章
    component: () => import(/* webpackChunkName: "arcticle" */ '../views/arcticle.vue')
  },
  {
    path: '/login',
    name: 'login', // 登录
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  },
  {
    path: '/changePassword',
    name: 'changePassword', // 修改密码
    component: () => import(/* webpackChunkName: "changePassword" */ '../views/login/changePassword.vue')
  },
  {
    path: '/admin',
    name: 'admin', // 后台管理主页
    // redirect: 'admin/user',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/index.vue'),
    children: [
      {
        path: 'user',
        name: 'userAdmin', // 用户个人信息管理
        component: () => import(/* webpackChunkName: "userAdmin" */ '../views/admin/user/user.vue'),
      },
      {
        path: 'friend',
        name: 'fanAdmin', // 普通用户： 粉丝、关注管理，管理员： 用户管理
        component: () => import(/* webpackChunkName: "friendAdmin" */ '../views/admin/friend/friend.vue'),
      },
      {
        path: 'blog',
        name: 'blogAdmin', // 博客管理
        component: () => import(/* webpackChunkName: "blogAdmin" */ '../views/admin/blog/blog.vue'),
      },
      {
        path: 'sort',
        name: 'sortAdmin', // 分类管理
        component: () => import(/* webapckChunkName: "sortAdmin" */ '../views/admin/sort/sort.vue'),
      },
      {
        path: 'sortItemAdmin',
        name: 'sortItemAdmin', // 分类管理
        component: () => import(/* webapckChunkName: "sortItemAdmin" */ '../views/admin/sort/admin.vue'),
      },
      {
        path: 'sortItemEdit',
        name: 'sortItemEdit', // 分类管理
        component: () => import(/* webapckChunkName: "sortItemEdit" */ '../views/admin/sort/edit.vue'),
      },
      {
        path: 'comment',
        name: 'commentAdmin', // 评论管理
        component: () => import(/* webapckChunkName: "commentAdmin" */ '../views/admin/sort/edit.vue'),
      },
    ]
  }
]
