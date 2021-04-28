<template>
  <div class="blog-blogList">
    <ul v-if="blogList.length">
      <li v-for="(item,index) in blogList" :key="index">
        <div class="blogList-title" @click="linkToArticle(item.fileId)">
          <span class="title-type">原创</span><span>{{item.title}}</span>
        </div>
        <div class="blogList-content">
          {{item.content}}
        </div>
        <div class="blogList-other">
          <div class="other-left">
            <span>{{item.createTime}}</span>
            <span><i class="el-icon-view"></i>{{item.see}}</span>
            <span><i class="el-icon-chat-round"></i>{{item.comment}}</span>
            <span><i class="el-icon-lollipop"></i>{{item.zan}}</span>
          </div>
          <div class="other-right" v-show="isAdmin">
            <span @click="linkToWrite(item.fileId)">编辑</span>
            <span @click="linkToArticle(item.fileId)">浏览</span>
            <span @click="delBlog(item.fileId)">删除</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="noblog" v-else @click="linkToWrite">
     <span> 目前没有发布过相对类型的博客哟~赶快去写一个叭</span>
    </div>
  </div>
</template>
<script>
import { delFile } from '@/api/api'
export default {
  name: 'blog-blogList',
  props: {
    blogList:{
      type:Array,
      default:()=>{
        return [
          {
            fileId: '123',
            title: '代码总结',
            type: 'test',
            sortName: '面试',
            createTime: '2021-03-18 23:50:30',
            zan: 12,
            see: 342,
            collect: 2,
            share: 3,
            comment: 5,
            content:'大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加'
          }
        ]
      }
    },
    isAdmin: {
      type: Boolean,
      default: false, // 进入了后台管理页面？？
    }
  },
  methods: {
    linkToArticle(fileId) {
      this.$router.push({
        path: '/arcticle',
        query: {
          fileId
        },
      })
    },
    linkToWrite(fileId) {
      this.$router.push({
        name: 'write',
        query: !fileId ? '' : fileId,
      })
    },
    // 删除博客
    delBlog(fileId,userId) {
      this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除请求
          let res = delFile(fileId,userId);
          if(res) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    }
  },
  created() {
    // let i = 0;
    // while(i<11) {
    //   i++;
    //   this.blogList.push(
    //     {
    //       fileId: '123',
    //       title: '代码总结',
    //       type: 'test',
    //       sortName: '面试',
    //       createTime: '2021-03-18 23:50:30',
    //       zan: 12,
    //       see: 342,
    //       collect: 2,
    //       share: 3,
    //       comment: 5,
    //       content:'大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加大数相加大大数相加大树相加大数相加大树相加大数相加大树相加树相加'
    //     }
    //   )
    // }
  }
}
</script>
<style lang="less" scoped>
.blog-blogList { background: #fff; 
  .noblog { text-align: center;  min-height: 542px; display: flex; justify-content: center; font-size: 20px; color: rgb(243, 174, 154); 
    background: url('../assets/img/noBlog.png'); background-repeat: repeat; 
    span { margin-top: 140px;}
  }
  li {padding: 5px; border-bottom: solid 1px rgb(238, 236, 236); 
    .blogList-title { padding: 5px 0;
      &:hover { cursor: pointer;}
      .title-type { color: red; background: #ecbbc278; font-size:12px; margin:0 5px; border-radius:3px; padding: 1px 3px;}
    }
    .blogList-content { font-size: 12px; color: #817c7c; padding: 0 5px;
     overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
    .blogList-other { font-size: 12px; padding: 5px;  display: flex; justify-content: space-between;
      span { margin-right: 5px;
        i { margin-right: 3px;}
      }
      .other-right span:hover {
        cursor: pointer;
      }
    }
  }
}
</style>

