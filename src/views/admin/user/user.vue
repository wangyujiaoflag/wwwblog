<template>
  <div class="blog-admin-userInfo">
    <div class="userInfo-base">
      <p>基本信息 <span class="base-p-edit"><i class="el-icon-edit-outline" v-if="infoResultShow"></i></span></p>
      <!-- 信息结果展示页 -->
      <div class="base-info" @click="editUserInfo" v-show="infoResultShow">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户昵称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="用户ID">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="form.realName" placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex" disabled>
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input v-model="form.introduce" placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="所在地区">
            <el-input v-model="form.localtion" placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-input v-model="form.birth" placeholder="未设置"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 信息修改界面 -->
      <div class="userInfo-base-detail" 
       v-show="!infoResultShow" 
       label-position="left" 
       :inline="true">
        <el-form>
          <el-form-item label="用户昵称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="用户ID">
            <el-input v-model="form.id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="form.realName" placeholder="未填写"></el-input>
          </el-form-item>
          <el-form-item label="所在地区">
            <el-cascader
              v-model="form.location"
              :options="option"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择出生日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个人简介" class="person-introduce">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              :rows="2"
              placeholder="请介绍一下自己叭~"
              v-model="form.intro">
            </el-input>
          </el-form-item>
        </el-form>
        <div class="form-submit"><el-button type="primary" @click="submit">提交</el-button></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'blog-admin-userInfo',
  data() {
    return {
      form: {
        name: '不归少年',
        id: 'wang_jiaoyaya',
        realName: '',
        sex: '女',
        introduce: '自律即自由',
        localtion: '资源 / Sketch Templates',
        birth: '2010-03-11'
      },
      infoResultShow: true,
      option: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
    }
  },
  methods: {
    editUserInfo() {
      // 修改个人信息
      this.infoResultShow = false;
    },
    submit() {
      // 提交保存个人信息
      this.$message({
          message: '恭喜你，你已修改成功',
          type: 'success'
      });
      // 错误提示信息
      // this.$message.error('错了哦，这是一条错误消息');

      this.infoResultShow = true;
    },
    handleChange() {
      // 所在地改变
    }
  }
}
</script>
<style lang="less" scoped>
.blog-admin-userInfo {
  .userInfo-base { background: #fff; margin: 20px auto; width: 80%; padding: 10px 20px; box-sizing: border-box;
    p { font-size: 18px; padding: 10px; position: relative;}
    span.base-p-edit { position: absolute; right: 0; top: 0;display: none;}
    &:hover { .base-p-edit { display: block;}}
  }
  .userInfo-base-detail form{
    .el-input { width: 800px;}
    // 改变宽度就不用下面的设置了
    // display: flex;  justify-content: space-around; flex-wrap: wrap; flex-direction: row; 
    // .el-form-item { margin-right: 100px;}
    .person-introduce { display: block;}
  }
    .form-submit { display: flex;  justify-content: center; }
}
</style>


