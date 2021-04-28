<template>
  <div class="blog-admin-arcticle">
    <div class="admin-arcticle-content">
      <!-- tab 全部 审核 草稿 待审核-->
      <el-tabs v-model="type" @tab-click="changeTab">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="已发布" name="1"></el-tab-pane>
        <el-tab-pane label="草稿" name="2"></el-tab-pane>
        <el-tab-pane label="待审核" name="3"></el-tab-pane>
      </el-tabs>
      <!-- 依据发布时间、文章分类、关键字进行搜索 -->
      <div class="content-search">
        <div class="search-time">
          <el-date-picker
            v-model="time"
            type="month"
            placeholder="选择发布时间">
          </el-date-picker>
        </div>
        <div class="search-sort">
          <el-select v-model="sort" placeholder="请选择文章类别" @change="sortChange">
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="search-keywords">
          <el-input v-model="keywords" placeholder="请输入关键字"></el-input>
          <el-button type="danger" @click="searchBlog">搜索</el-button>
        </div>
      </div>
      <!-- 博文列表 -->
      <div class="content-list" v-loading="loading">
        <blogLists :blogList="list" :isAdmin="true"></blogLists>
      </div>
      <!-- 分页 -->
      <div class="content-page" v-show="list.length>0">
        <el-pagination
          layout="prev, pager, next"
          background
          :page-size="size"
          :current-page="page"
          @current-change="updatePage"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import blogLists from '@/components/blogList'
import { findBlog , getSortOptions } from '@/api/api'
export default {
  name: 'blog-admin-arcticle',
  data() {
    return {
      type: '0', // 默认选择类型
      time: '', // 发布时间
      sort: '后端', // 博文分类当前值
      sortOptions: [],
      keywords: '', // 搜素关键字
      loading: false,
      total: 50, // 页数
      page: 1,
      size: 5,
      list: [
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
      ], // 博客列表
    }
  },
  components: {
    blogLists,
  },
  created() {
    // this.searchBlog();
    this.getSortOptionsList(); // 获取options列表
  },
  methods: {
    // type改变
    changeTab(tab,event) {
      console.log(tab,'type');
      this.type = tab.name;
    },
    // sort改变
    sortChange(sort) {
      console.log(sort,'sort');
      this.sort = sort;
    },
    // 搜索博文
    async searchBlog() {
      // 请求api page,size,keywords,time,type,sort
      this.loading = true;
      let res = await findBlog({
        page: this.page,
        size: this.size,
        keywords: this.keywords,
        time: this.time,
        type: this.type,
        sort: this.sort
      });
      if(res) {
        this.loading = false;
        // this.list = res.list;
        // this.total = res.total;
      }
    },
    // 获取options列表
    getSortOptionsList() {
      // 发出请求
      // let res = await getSortOptions();
      // if(res) {
      //   this.sortOptions = res.options;
      // }
      this.sortOptions = [
        {
          label: '前端',
          value: 'web'
        },
        {
          label: '后端',
          value: 'java'
        }
      ];
    },
    // 页数改变，更新列表
    updatePage(page) {
     this.searchBlog();
    },
  }
}
</script>
<style lang="less" scoped>
.setFixed { display: flex; flex-direction: row; justify-content: flex-start; align-items: center;}
.blog-admin-arcticle { height: calc(100vh - 51px); overflow-y: auto; padding: 10px; box-sizing: border-box;
  .content-search { .setFixed(); margin-bottom: 15px;
    div { margin-right: 20px;}
    .search-keywords { .setFixed();}
  }
  .content-list { text-align: left;}
  .content-page { margin: 20px 0;}
}
</style>


