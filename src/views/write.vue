<template>
  <div class="blog-write">
    <!-- 返回icon，标题，保存草稿/发布 -->
    <div class="blog-write-info" ref="wrtieTop">
      <div class="info-back" @click="goBack"><i class="el-icon-arrow-left"></i>返回</div>
      <div class="info-title"><el-input v-model="title" :placeholder="defaultTitle"></el-input>
      </div>
      <div class="info-button">
        <el-button type="warning" @click="save(0)">保存草稿</el-button>
        <el-button type="danger" @click="dialogFormVisible = true">发布</el-button>
      </div>
    </div>
    <v-md-editor 
     v-model="text" 
     height="calc(100vh - 60px)"
     :disabled-menus="[]"
     @copy-code-success="copyCode"
     @upload-image="handleUploadImage">
    </v-md-editor>
    <el-dialog title="文章分类" :visible.sync="dialogFormVisible">
      <el-form :model="sortForm">
        <el-form-item label="文章标签" :label-width="formLabelWidth">
          <el-tag
            class="tagClass"
            :key="tag"
            v-for="tag in (sortForm.dynamicTags || [])"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-button class="button-new-tag" size="small" @click="showInput">+添加文章标签</el-button>
          <el-card class="box-card" v-if="sortForm.inputVisible">
            <el-input
              class="input-new-tag"
              v-model="sortForm.inputValue"
              ref="saveTagInput"
              size="small"
              placeholder="enter键入可添加自定义标签"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <!-- 大类 推荐 数据库 前端等等-->
            <ul class="sortClass">
              <li v-for="(item,index) in sortlist" :key="index" @click="inputConfirm(item.name)">{{item.name}}</li>
            </ul>
          </el-card>
        </el-form-item>
        <el-form-item label="分类专栏" :label-width="formLabelWidth">
          <el-tag
            class="tagClass"
            :key="val"
            v-for="val in (tagForm.dynamicTags || [])"
            closable
            :disable-transitions="false"
            @close="handleClose1(val)">
            {{val}}
          </el-tag>
          <el-button class="button-new-tag" size="small" @click="showInput1">+添加分类专栏</el-button>
          <el-card class="box-card" v-if="tagForm.inputVisible">
            <el-input
              class="input-new-tag"
              v-model="tagForm.inputValue"
              ref="saveTagInput1"
              size="small"
              placeholder="enter键入可添加自定义标签"
              @keyup.enter.native="handleInputConfirm1"
              @blur="handleInputConfirm1"
            ></el-input>
            <!-- 自己的分类 mysql js web 等等-->
            <ul class="sortClass">
              <li v-for="(item,index) in taglist" :key="index" @click="inputConfirm1(item.name)">{{item.name}}</li>
            </ul>
          </el-card>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save(1)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 代码块和有序、无序列表存在问题 图片大小设置不能自适应
import axios from 'axios'
import { upImage ,saveArticle ,addFile} from '@/api/api';
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
export default {
  name: 'write',
  data() {
    return {
      title: '写博客',
      defaultTitle: '标题：'+ new Date(),
      text:'测试博客4.27', // 文件内容
      userId: '123', // 全局存储 完了从store中获取
      dialogFormVisible: false, // 弹框是否显示
      sortForm: {
        dynamicTags: ['前端'],
        inputVisible: false,
        inputValue: ''
      },
      tagForm: {
        dynamicTags: ['js'],
        inputVisible: false,
        inputValue: ''
      },
      formLabelWidth: '80',
      sortlist: [
        {
          name: '前端',
          type: 'web',
        },{
          name: '后端',
          type: 'java',
        }
      ],
      taglist: [
        {
          name: '前端',
          type: 'web',
        },{
          name: '后端',
          type: 'java',
        }
      ]
    }
  },
  methods: {
    // 返回上一页
    async goBack() {
      if(!this.text) this.$router.back(-1);
      else {
        await this.$confirm('编辑中有内容，是否保存为草稿?', '注意啦~', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          let res = saveArticle({
            type,
            title: this.title || this.defaultTitle,
            content: this.text,
            userId: this.userId,
            sortForm: this.sortForm.dynamicTags,
            tagForm: this.tagForm.dynamicTags,
          });
          if(res) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
          } else {
            this.$message({
              type: 'success',
              message: '已取消保存!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'fail',
            message: '保存失败'
          });          
        });
        this.$router.back(-1);
      }
    },
    // 复制代码
    copyCode(code) {
      const html = xss.process(VueMarkdownEditor.themeConfig.markdownParser.render(code));
      console.log(html,'复制的代码，如果自己在后面添加，复制的时候不生效');
    },
    // 插入图片
    handleUploadImage(event, insertImage, files) {
      let imgUrl;
      let imgName = files[0].name;
      var formData = new FormData()
      formData.append("file", files[0])
      var config = {
          headers: {
            "Content-Type": "multipart/form-data"
            }
        }
      upImage(formData, config).then(res=>{
        imgUrl = res.body;
        insertImage({
          url: imgUrl,
          desc: imgName,
          width: 'auto',
          height: 'auto',
        });
      })
    },
    // 保存草稿0、发布文章1
    async save(type) {
      // console.log(this.text,'文章')
      let res = await addFile({
        status: type,
        title: this.title || this.defaultTitle,
        content: this.text,
        // userId: this.userId,
        type: this.sortForm.dynamicTags, // 大类
        label: this.tagForm.dynamicTags, // 自己的
      });
      // let res = 1;
      if(res) {
        console.log(res,'关于文章');
        let message = type == 0 ? '保存草稿成功,是否继续写文章？' : '申请发布成功，是否预览文章？';
        this.$confirm(message, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          if(type == 0) {
            this.text = '';
            this.title = '';
            this.defaultTitle = new Date();
          } else {
            this.dialogFormVisible = false;
            this.$router.push({
              name: 'arcticle'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '即将跳转至首页~'
          });  
          this.$router.push({
            name: 'Home'
          })        
        });
      }
    },
    // 关闭标签
    handleClose(tag) {
       this.sortForm.dynamicTags.splice(this.sortForm.dynamicTags.indexOf(tag), 1);
    },
    handleClose1(tag) {
       this.tagForm.dynamicTags.splice(this.tagForm.dynamicTags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.sortForm.inputValue;
      if (inputValue && !this.sortForm.dynamicTags.includes(inputValue)) {
        this.sortForm.dynamicTags.push(inputValue);
      }
      this.sortForm.inputValue = '';
    },
    handleInputConfirm1() {
      let inputValue = this.tagForm.inputValue;
      if (inputValue && !this.tagForm.dynamicTags.includes(inputValue)) {
        this.tagForm.dynamicTags.push(inputValue);
      }
      this.tagForm.inputValue = '';
    },
    inputConfirm(tag) {
      if(tag && !this.sortForm.dynamicTags.includes(tag)) {
        this.sortForm.dynamicTags.push(tag);
      }
      this.sortForm.inputValue = '';
    },
    inputConfirm1(tag) {
      if(tag && !this.tagForm.dynamicTags.includes(tag)) {
        console.log(tag,'dkdkdkdkkdkd');
        this.tagForm.dynamicTags.push(tag);
      }
      this.tagForm.inputValue = '';
    },
    showInput() {
      this.sortForm.inputVisible = !this.sortForm.inputVisible;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    showInput1() {
      this.tagForm.inputVisible = !this.tagForm.inputVisible;
      this.$nextTick(_ => {
        this.$refs.saveTagInput1.$refs.input.focus();
      });
    },
  },
  mounted(){}
}
</script>
<style lang="less" scoped>
@head: 60px;
.blog-write {
  .blog-write-info { padding: 10px 15px; box-sizing: border-box;
    display: flex; flex-direction: row; justify-content: space-between; align-items: center;
    .info-title { width: 500px;}
  }
  .tagClass { margin: 0 5px;}
  .sortClass { 
    display: flex; flex-direction: row; justify-content: flex-start; align-items: center; margin: 10px 0;
    li { padding: 0 5px; background: rgb(241, 232, 232); color: #000; font-size: 12px; margin: 0 5px; height: 30px; line-height: 30px;
      &:hover { cursor: pointer; background:red; color: #fff;}
    }
    }

}
</style>


