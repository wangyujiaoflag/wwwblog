<template>
  <div class="blog-arcticle">
    <div class="arcticle-content">
      <!-- 文章标题、作者，发布时间 -->
      <div class="arcticle-top">
        <span class="arcticle-title">{{article.title}}</span>
        <span class="arcticle-author" @click="linkTo(article.userId)">作者：{{article.author}}</span>
        <span class="arcticle-createTime">发表时间：{{article.createTime}}</span>
        <span class="arcticle-edit" @click="eidtArticle('edit',article.fileId,article.userId)">编辑</span>
        <span class="arcticle-delete" @click="eidtArticle('delete',article.fileId,article.userId)">删除</span>
      </div>
      <!-- 文章详情 -->
      <v-md-preview :text="text"></v-md-preview>
      <!-- 评论 -->
      <!-- <comment 
       @doSend="doSend($event)"  
       @doChidSend="doChidSend(arguments)" 
       :commentList="commentList" 
       :commentNum="commentNum" 
       :label="label" 
       :avatar="avatar" 
       :placeholder="placeholder" 
       :minRows="minRows" 
       :maxRows="maxRows">
      </comment> -->
      <comment></comment>
    </div>
  </div>
</template>
<script>
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
// import comment from '@/components/ac.vue';
// import comment from 'hbl-comment'
import comment from '@/components/comment3/parent.vue'
export default {
  name: 'arcticle',
  data() {
    return {
        article: {
          title: 'js的面试核心内容',
          fileId: '12344',
          fileContent: '',
          zan: 3,
          comment: 5,
          share: 6,
          collect: 61,
          commentList: [],
          author: '不归',
          userId: '233',
          createTime: '2019-3-4'
        },
        // label:"SVIP",
        placeholder:"说点什么吧",
        minRows:4,
        maxRows:4,
        commentNum:2, // 评论总数
        avatar:'',
        commentList:[
          {
            id:1,
            commentUser:{
                id:1,
                nickName:'花非花',
                avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'
            },
            content:"<a style='text-decoration:none;color: #409eff ' href='https://blog.csdn.net/abcwanglinyong/'>我的CSDN博客地址</a>[害羞][害羞][害羞]<br/>",
            createDate:'2019-9-23 17:36:02',
            childrenList:[
              {
                id:2,
                commentUser:{
                  id:2,
                  nickName:'坏菠萝',
                  avatar:''
                },
                targetUser:{
                  id:1,
                  nickName:'花非花',
                  avatar:'http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50'
                },
                content:'真的就很棒！很Nice!',
                createDate:'2019-9-23 17:45:26'
              }
            ]
          }
        ],
    }
  },
  props: {
    text: {
      type: String,
      default: () => {
        return 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'
      }
    }
  },
  components: {
    comment,
  },
  methods: {
    // 用户中心
    linkTo(userId) {
      this.$router.push({
        name: 'Home',
        query: {
          userId:userId
        },
      })
    },
    // 编辑文章
    async eidtArticle(type,fileId,userId) {
      if(type == 'delete') {
        // 删除
       let res = await delFile({ fileId, userId });
      } else if(type == 'edit') {
        // 再编辑，跳转到write页面
        let res = await changeFile({ fileId, userId });
        this.$router.push({
          path: '/write',
          query: {
            fileId, userId
          }
        })
      }
    },
    doSend(content){
      console.log("点击按钮发送评论内容"+content);
    },
    doChidSend(args){
      console.log("评论区发送按钮点击事件：");
      console.log("回复的内容="+args[0]);
      console.log("targetUserId，当前你回复了谁的评论="+args[1]);
      console.log("父级评论id,即最顶层的评论="+args[2]);
    }
  }
}
</script>
<style lang="less" scoped>
@head: 60px;
.blog-arcticle { background:#fff; height: 100vh; overflow-y: auto;
.arcticle-content { margin: 0 120px;  background: rgba(226, 226, 202, 0.61); min-height: 100vh;
  .arcticle-top { padding: 10px 0;
    span { margin: 0 10px; font-size: 12px; color:rgb(163, 160, 160);
      &.arcticle-title { font-size: 18px; font-weight: 600; color: #000;}
      &.arcticle-edit { color: blue; }
      &.arcticle-delete { color: blue;  margin: 0 5px;}
    }
  }
}
}
</style>


