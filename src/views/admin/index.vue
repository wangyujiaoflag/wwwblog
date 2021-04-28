<template>
  <div class="blog-admin">
    <adminHeader></adminHeader>
    <div class="admin-center">
      <div class="admin-left-nav">
         <el-menu
          :default-active="$route.path"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item :index='`${baseUrl}/user`'>
              <i class="el-icon-menu"></i>
              <span slot="title">个人信息管理</span>
          </el-menu-item>
          <el-menu-item :index='`${baseUrl}/blog`'>
            <i class="el-icon-menu"></i>
            <span slot="title">文章管理</span>
          </el-menu-item>
          <el-menu-item :index='`${baseUrl}/sort`'>
            <i class="el-icon-document"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item :index='`${baseUrl}/check`'>
            <i class="el-icon-setting"></i>
            <span slot="title">审核管理</span>
          </el-menu-item>
          <el-menu-item :index='`${baseUrl}/comment`'>
            <i class="el-icon-setting"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item :index='`${baseUrl}/friend`'>
            <i class="el-icon-setting" route="/friend"></i>
            <span slot="title">粉丝、点赞管理</span>
          </el-menu-item>
          <el-menu-item :index='`${baseUrl}/study`'>
            <i class="el-icon-setting"></i>
            <span slot="title">图书资料管理</span>
          </el-menu-item>
          <el-menu-item :index='`${baseUrl}/collect`'>
            <i class="el-icon-setting"></i>
            <span slot="title">收藏夹管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="admin-right-content">
        <div v-if="$route.path=='/admin'" class="right-content-welcome">欢迎来到后台管理系统</div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import adminHeader from '@/components/adminHeader'
export default {
  name: 'admin',
  data() {
    return {
      baseUrl: '/admin',
    }
  },
  components: {
    adminHeader,
  },
  created() {},
  methods: {
    handleOpen() {},
    handleClose() {}
  }
}
</script>
<style lang="less" scoped>
.blog-admin { background: #f8efef;
  .admin-center { height: calc(100vh - 51px); display: flex; flex-direction: row; justify-content: space-between;
    .admin-left-nav { width: 240px; height: 100%; background: #545c64;}
    .admin-right-content { flex: 1; text-align: center; 
      .right-content-welcome { width:100%; height: 100%; font-size: 20px; color: cadetblue; padding-top: 230px;
      // 无法设置水平垂直居中
        // position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto;
      }
    }
  }
}
</style>


