<template>
  <div class="blog-userCard">
    <div class="userCard-nick">
      <div class="nick-img">
        <!-- <img src="" alt=""> -->
      </div>
      <span class="nick-name">昵称</span>
    </div>
    <div class="userCard-info">
      <p class="info-intro">个人简介: 好的坏的都是经历~加油吧少年！！！</p>
      <p class="info-data">
        <span>博文:6篇</span>
        <span>点赞:8篇</span>
        <span>评论:6篇</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'blog-userCard',
}
</script>
<style lang="less" scoped>
.blog-userCard { padding: 20px; box-sizing: border-box;
  .userCard-nick { display: flex; align-items: center; margin-bottom: 20px;
    .nick-img { display: inline-block; width: 40px; height: 40px; border-radius: 50%; 
    background: #ac92a4d9; 
      img { width: 100%; height: 100%; border-radius: 50%;}
    }
    .nick-name { margin-left: 20px;}
  }
  // 用户简介
  .userCard-info { 
    .info-intro { font-size: 13px; color: #fff; margin: 5px 0;overflow : hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;}
    .info-data { font-size: 12px; color: #fff; text-align: center;
      span { margin-left: 10px;}
    }
  }
}
</style>

