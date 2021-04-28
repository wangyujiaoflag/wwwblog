<template>
  <div class="blog-admin-sort">
    <div class="admin-sort-content">
      <!-- 名字 -->
      <p class="sort-title">
        <span class="title-name">分类专栏</span>
        <el-button type="danger" round @click="addNewSort">新建</el-button>
      </p>
      <!-- tab 全部 审核 草稿 待审核-->
      <el-tabs v-model="type" @tab-click="changeTab">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="回收站" name="1"></el-tab-pane>
      </el-tabs>
      <!-- table表格 -->
      <div class="sort-table">
        <el-table
            :data="tableData"
            v-loading="loading"
            border
            style="width: 100%">
            <el-table-column
              prop="sort"
              label="排序">
            </el-table-column>
            <el-table-column
              prop="name"
              label="类别">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button @click="lookSort(scope.row)" type="text" size="small">查看</el-button>
                <el-button type="text" size="small" @click="editSort(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="delSort(scope.row)" style="color:red;">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="前台是否显示">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.show"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              prop="blogNums"
              label="文章数"
              width="180">
            </el-table-column>
          </el-table>
      </div>
    </div>
  </div>
</template>
<script>
// import { findBlog , getSortOptions } from '@/api/api'
export default {
  name: 'blog-admin-arcticle',
  data() {
    return {
      type: '0', // 默认选择类型
      loading: false,
      tableData: [],
    }
  },
  created() {
    this.getSortList();
  },
  methods: {
    // type改变
    changeTab(tab,event) {
      console.log(tab,'type');
      this.type = tab.name;
    },
    // 操作相关
    lookSort(row) {
      console.log(row);
      this.$router.push({
        name: 'sortItemAdmin',
        query: {
          sortId: row.sortId,
          sortName: row.name,
        }
      })
    },
    editSort(row) {
      console.log(row);
      this.$router.push({
        name: 'sortItemEdit',
        query: {
          sortId: row.sortId,
        }
      })
    },
    delSort(row) {
      console.log(row);
      this.$confirm('此操作将永久删除该分类文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除分类文件夹

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    },
    // getSortList
    getSortList() {
      // this.loading = true;
      this.tableData= [
        {
          sort: '1',
          name: '前端',
          show: true,
          blogNums: 20,
          sortId: '12345'
        }
      ]
    },
    // 新建分类
    addNewSort() {
      this.$router.push({
        name: 'sortItemEdit'
      })
    }

  }
}
</script>
<style lang="less" scoped>
.setFixed { display: flex; flex-direction: row; justify-content: flex-start; align-items: center;}
.blog-admin-sort { height: calc(100vh - 51px); overflow-y: auto; padding: 10px; box-sizing: border-box;
  .sort-title { .setFixed(); justify-content: space-between;
    .title-name { font-size: 20px; font-weight: 800;}
  }
}
</style>


