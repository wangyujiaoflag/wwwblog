<template>
  <div class="blog-login">
    <div class="login-box" v-loading="loading">
      <div class="login-box-header">
        <p class="login-title">个人技术博客平台密码修改</p>
      </div>
      <!-- 修改密码 -->
      <el-form 
        :model="changeRuleForm" 
        :rules="changeRules" 
        ref="changeRuleForm" 
        label-width="80px" 
        class="change-ruleForm">
        <el-form-item label="账号">
          <el-input type="text" v-model="changeRuleForm.userName" autocomplete="off" placeholder="请输入您的账号信息" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="原密码" prop="originPass">
          <el-input type="password" v-model="changeRuleForm.originPass" autocomplete="off" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="changeRuleForm.newPass" autocomplete="off" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repeatPass">
          <el-input type="password" v-model="changeRuleForm.repeatPass" autocomplete="off" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item class="form-btn">
          <el-button type="primary" @click="submitForm('changeRuleForm')">保存</el-button>
          <el-button @click="resetForm('changeRuleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { changePassword } from '@/api/api'
  export default {
    data() {
      // 新密码
      var checkNewPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
          if (this.changeRuleForm.newPass !== '' && pPattern.test(value)) {
            this.$refs.changeRuleForm.validateField('repeatPass');
          } else {
            // WGyb1.
            callback(new Error('最少6位，至少1个大写字母，1个小写字母，1个数字，1个特殊字符'))
          }
          callback();
        }
      };
      // 重复密码输入
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.changeRuleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        // 修改表单
        changeRuleForm: {
          originPass: 'wyj',
          newPass: 'WGyb1@23',
          repeatPass: 'WGyb1@23',
          userName: 'admin'
        },
        changeRules: {
          newPass: [
            { validator: checkNewPassword, trigger: 'blur' }
          ],
          repeatPass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        },
        loading: false,
      };
    },
    methods: {
      submitForm(formName) {
        this.loading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            // 修改密码
            changePassword({
              loginName: this.changeRuleForm.userName,
              oldPassword: this.changeRuleForm.originPass,
              newPassword: this.changeRuleForm.newPass,
            }).then(res=>{
              console.log(res,'xiugai ');
              if(res) {
                this.loading = false;
                this.$notify({
                  title: '修改',
                  message: '密码修改成功，即将跳转至登录界面',
                  offset: 100,
                  duration: 1000,
                });
                setTimeout(()=>{
                  this.$router.push({
                    name: 'login'
                  })
                })
              }
            },err=>{
              this.$router.push({
                name: 'changePassword'
              })
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="less" scoped>
.setFlex { display: flex; flex-direction: row; justify-content: center; align-items: center;}
.blog-login {
  height: 100vh; .setFlex(); box-sizing: border-box; background: #000;
  .login-box { width: 400px; border-radius: 10px; border: solid 1px #d7c2c6; padding: 10px 20px; box-sizing: border-box; background: #fff; height: 410px;
    .login-box-header { text-align: center; padding: 10px;
      .login-forgetPassword { text-align: right; font-size: 12px;
        span:hover { cursor: pointer;}
      }
    }
  }
  .form-btn { display: flex; justify-content: center;}
  .el-form-item { margin-bottom: 30px;}
}
</style>


