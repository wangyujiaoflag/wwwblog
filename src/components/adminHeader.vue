<template>
  <div class="blog-admin-header">
    <div class="admin-header-left">
      欢迎来到<span>博客后台管理系统</span>，您当前的身份为<span v-if="userRole==0">普通用户</span><span v-else>管理员</span>
    </div>
    <div class="admin-header-right">
      <div class="header-login">
        <el-dropdown trigger="click" @command="linkTo">
          <span class="el-dropdown-link">
            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-unlock" command="login">退出登录</el-dropdown-item>
            <el-dropdown-item icon="el-icon-user" command="">前台主页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-edit" command="write">写文章</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'blog-admin-header',
  data() {
    return {
      userRole: 0,
      userName: '不归',
    }
  },
  methods: {
    // 跳转
    async linkTo(type) {
      if(type == 'logout') {
        let res = await logout();
        this.$router.push({
          name: 'login'
        })
      } else {
        this.$router.push({
          path: '/'+type,
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
// 弹性布局设置
.setFlex { display: flex; justify-content: space-between; align-items: center;}
.blog-admin-header { .setFlex(); background: #e7dce4;
  padding: 15px 10px; box-shadow: 0 0 3px 2px #ddd; box-sizing: border-box;
  .admin-header-left span {
    color: red;
  }
}
</style>

