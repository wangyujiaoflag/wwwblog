<template>
  <div class="blog-admin-sortEdit">
    <div class="sortEdit-content">
      <!-- 返回分类专栏 -->
      <el-page-header @back="goBack" content="分类专栏编辑">
      </el-page-header>
      <!-- form表单 -->
      <div class="content-form">
        <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="分类专栏名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="分类专栏简介">
           <el-input type="textarea" v-model="form.introduce" prop="introduce"></el-input> 
        </el-form-item>
        <el-form-item label="分类专栏配图">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="">
          <el-button type="danger" round @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'blog-admin-sortEdit',
  data() { 
    return {
      form: {
        name: '前端',
        introduce: 'dddd',
        imageUrl: '',
      }
    }
  },
  props: {},
  methods: {
    goBack() {
      this.$router.back(-1);
    },
    // 图片上传成功
    handleAvatarSuccess(res,file) {
      this.form.imageUrl = URL.createObjectURL(file.raw)
    },
    // 
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    // 修改信息 提交
    submit() {}
  }
}
</script>

<style lang="less" scoped>
.blog-admin-sortEdit {
  height: calc(100vh - 51px); overflow-y: auto; padding: 10px; box-sizing: border-box;
  .sortEdit-content {
    .content-form { margin: 20px 0;}
  }
}
</style>
