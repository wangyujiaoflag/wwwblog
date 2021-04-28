<template>
  <div class="blog-admin-sortAdmin">
    <div class="sortAdmin-content">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">分类项</el-breadcrumb-item>
        <el-breadcrumb-item>管理文章</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 批量操作 -->
      多选框，选项，应用
      <!-- 文章列表 -->
      <div class="sortItemList">
        <ul>
          <li v-for="(item) in sortItemList" :key="item.fileId">
            <div class="list-item-title">{{item.fileName}}</div>
            <div class="list-item-operate">
              <span @click="linkToBlog(item.fileId)" class="look">查看</span>
              <span @click="delBlog(item.fileId,item.useId,item.sortId)" class="del">删除</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { delFile } from '@/api/api'
export default {
  name: 'blog-admin-sortAdmin',
  data() { 
    return {
      sortItemList: [
        {
          fileId: '1234',
          fileName: 'js事件流',
          sortId: '345',
          sortName: '前端',
          userId: 'ddfjdf'
        }
      ]
    }
  },
  methods: {
    // 查看原文
    linkToBlog(fileId) {
      this.$router.push({
        name: 'arcticle',
        fileId: fileId,
      })
    },
    async delBlog(fileId,useId,sortId) {
      // 请求+弹框
     await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let res = delFile(fileId,useId,sortId);
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
    },
  }
}
</script>

<style lang="less" scoped>
.setFixed { display: flex; justify-content: space-between; align-items: center;}
.blog-admin-sortAdmin {
  height: calc(100vh - 51px); overflow-y: auto; padding: 10px; box-sizing: border-box;
  .sortAdmin-content {
    .sortItemList { 
      margin: 10px 0;
      ul li {.setFixed(); padding: 10px 0; border-bottom: solid 1px rgb(216, 207, 207);
        .list-item-title { font-weight: 600; &:hover { cursor: pointer;}}
        .list-item-operate span { margin: 0 10px;
          &:hover { cursor: pointer;}
          &.look { color: blue;}
          &.del { color: red;}
        }
      }
    }
  }
}
</style>
