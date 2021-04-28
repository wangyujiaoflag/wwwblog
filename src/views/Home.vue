<template>
  <div class="blog-home">
    <Header :userName="userName"></Header>
    <div class="home-center">
      <div class="center-content">
        <div class="center-left">
          <div class="left-userInfo">
            <userCard></userCard>
          </div>
          <div class="left-user-searchBlog">
            <el-input placeholder="搜索博主文章" v-model="userBlog" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <div class="left-user-sortList">
            <h4 style="background: #333; color: #fff; height:40px;line-height:40px;padding-left:5px">分类专栏</h4>
            <ul>
              <li v-for="(item,index) in sortList" 
               :key="index" 
               @click="linkTo(item)"
               class="sortList-li">
                <!-- <img :src="item.img">  -->
                <span style="float:left;"><i :class="item.icon"></i> <span>{{item.name}}</span></span>
                <span style="float:right; padding-right:10px">{{item.num}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="center-right">
          <div class="right-blogTab">
            <el-menu :default-active="currentTab" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">博客</el-menu-item>
              <el-menu-item index="2">收藏</el-menu-item>
              <el-menu-item index="3">关注</el-menu-item>
            </el-menu>
          </div>
          <div class="right-blogSort">
            排序方式: <span :style="{'color':activeOrder == 1 ? 'red' : ''}" @click="activeOrder = 1">按点赞数量</span>
            <span :style="{'color':activeOrder == 2 ? 'red' : ''}" @click="activeOrder = 2">按浏览量</span>
          </div>
          <div class="right-blogList">
            <blogList></blogList>
          </div>
          <div class="right-page">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import userCard from '@/components/userCard.vue'
import blogList from '@/components/blogList.vue'
export default {
  name: 'Home',
  components: {
    Header,
    userCard,
    blogList
  },
  data() {
    return {
      total: 1000, // 博客总数
      userBlog: '', // 博主文章搜索关键字
      sortList: [ // 博客分类列表
        {
          name: '面试',
          type: 'test',
          num: 4,
          img: '',
          icon: 'el-icon-goods',
        },
        {
          name: '前端',
          type: 'web',
          num: 7,
          img: '',
          icon: 'el-icon-video-camera-solid',
        },
      ],
      currentTab: '1', // 当前tab
      activeOrder: 1, // 当前排序方式
      userName: '未登录',
    }
  },
  created() {
    this.userName = this.$route.query.userName;
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    // 去分类页面 item看到时候咋传
    linkTo(item) {

    }
  }
}
</script>
<style lang="less">
.setFlex { display: flex; flex-direction: row;}
.blog-home { background:rgba(226, 226, 202, 0.61); 
  .home-center { height: calc(100vh - 70px); overflow-y: auto;
  // 只有屏幕那么大的区域
    .center-content {
      .setFlex(); justify-content: space-between; 
      margin: 0 120px; box-sizing: border-box;
      .center-left { flex: 1; margin-right: 5px; 
        .left-userInfo { height: 200px; background: lightseagreen; }
        .left-user-searchBlog { margin: 5px 0;
          input:hover { cursor: pointer;}
        }
        .left-user-sortList { background: rgb(248, 244, 244);
          .sortList-li { height:35px; line-height:35px; border-bottom:solid 1px #347896;
            &:hover { cursor: pointer;}
          }
        }
      }
      .center-right { flex: 4; background: #fff; 
        .right-blogSort { font-size:12px; padding:5px; border-bottom: solid 1px rgb(208, 211, 212); height: 30px; line-height:30px;
          span { margin: 0 10px;
            &:hover { cursor: pointer;}
          }
        }
        .right-page { display: flex; justify-content: center; margin-top:20px; padding-bottom: 20px;}
      }
    }
  }
}
</style>
