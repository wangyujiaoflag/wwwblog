<template>
  <div class="blog-Header">
      <!-- 左边 导航 -->
      <div class="header-left">
        <ul>
          <li v-for="(item,index) in headList" :key="index">
            <router-link :to="item.path">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
      <!-- 中间 搜索 -->
      <div class="header-search">
        <el-input placeholder="这里可以搜索所有博文呦" 
         v-model="searchWord" 
         class="input-with-select">
          <el-button 
           slot="append" 
           icon="el-icon-search"
           @change="searchArticle"
           @click="searchArticle"></el-button>
        </el-input>
      </div>
      <!-- 右边 用户以及登录状态 退出登录 后台 写文章-->
      <div class="header-login">
        <el-dropdown trigger="click" @command="linkTo">
          <span class="el-dropdown-link">
            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
            <el-dropdown-item icon="el-icon-user" command="admin">后台管理</el-dropdown-item>
            <el-dropdown-item icon="el-icon-edit" command="write">写文章</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>
</template>

<script>
import { logout } from '@/api/api'
export default {
  name: 'blog-Header',
  props: {
    userName: {
      type:String,
      default: '未登录',
    }
  },
  data() {
    return {
      searchWord: '', // 搜索文字
      headList: [
        { name: '文章', path: ''}, { name: '后台', path: ''}
      ],
    }
  },
  methods: {
    // 搜索文章
    searchArticle() {
      console.log(this.searchWord);
    },
    // 跳转
    async linkTo(type) {
      if(type == 'logout') {
        let res = await logout();
        if(res) {
          console.log('logout');
          this.$router.push({
            name: 'login'
          })
        }
      } else {
        this.$router.push({
          path: '/'+type,
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
// 弹性布局设置
.setFlex { display: flex; justify-content: space-between; align-items: center;}
.blog-Header {
  width: 100%; padding: 15px 10px; box-shadow: 0 0 3px 2px #ddd; box-sizing: border-box; height:70px;
  .setFlex(); 
  .header-left { flex: 5; 
  // background: pink;
    ul { .setFlex(); justify-content: flex-start;
      li { padding: 0 10px;}
    }
  }
  .header-search { flex: 3; }
  .header-login { flex: 2; display: flex; justify-content: flex-end; padding: 0 10px;
    &:hover { cursor: pointer; }
    // background: red;
  }
}
</style>
