<template>
  <div class="blog-login">
    <div class="login-box" v-loading="loading">
      <div class="login-box-header">
        <p class="login-title">个人技术博客平台登录</p>
        <p class="login-forgetPassword">
          <span @click="changePassword">修改密码</span>
        </p>
      </div>
      <el-form 
        :model="loginRuleForm" 
        :rules="loginRules" 
        ref="loginRuleForm" 
        label-width="40px" 
        class="login-ruleForm">
        <el-form-item label="账号" prop="userName">
          <el-input type="text" v-model="loginRuleForm.userName" autocomplete="off" placeholder="请输入您的账号信息"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="loginRuleForm.pass" autocomplete="off" placeholder="请输入您的密码"></el-input>
        </el-form-item>
        <el-form-item class="form-btn">
          <el-button type="primary" @click="submitForm('loginRuleForm')">登录</el-button>
          <el-button @click="resetForm('loginRuleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/api';
import storage from '@/util/cookie';
import { mapState } from "vuex";
export default {
  data() {
    // 密码
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var checkName = (rule, value, callback) => {
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!value) {
        return callback(new Error('账号不能为空'));
      } else if(uPattern.test(value)) {
        return callback(new Error('账号不符合要求，要求4到16位（字母，数字，下划线，减号）'))
      }
    };
    return {
      loginRuleForm: {
        pass: 'WGyb1@23',
        userName: 'admin'
      },
      loginRules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        userName: [
          { validator: checkName, trigger: 'blur'}
        ]
      },
      loading: false,
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin, // 是否登录
      token: state => state.token, // token值
    })
  },
  methods: {
    // 登录
    async submitForm(formName) {
      let loginName = this.loginRuleForm.userName;
      let password = this.loginRuleForm.pass;
      this.loading = true;
      let res = await login({loginName,password});
      console.log(res,'登录');
      if(res) {
        let token = res.body;
        let isLogin = true;
        // 将token保存在本地
        storage.set('TOKEN',token);
        // store中存token、存当前的登录状态
        // this.$store.dispatch("SET_LoginInfo",{token,isLogin})
        this.loading = false;
        // 登录成功提示
        this.$message({
          message: '祝贺小主登录成功~马上转到主页',
          type: 'success',
        });
        this.$router.push({
          name: 'Home',
          query: {
            userName: this.loginRuleForm.userName,
          }
        });
      }
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改密码
    changePassword() {
      this.$router.push({
        name: 'changePassword'
      })
    }
  }
}
</script>
<style lang="less" scoped>
.setFlex { display: flex; flex-direction: row; justify-content: center; align-items: center;}
.blog-login {
  height: 100vh; .setFlex(); box-sizing: border-box; background: #000;
  .login-box { width: 400px; border-radius: 10px; border: solid 1px #d7c2c6; padding: 10px 20px; box-sizing: border-box; background: #fff; height: 250px;
    .login-box-header { text-align: center; padding: 10px;
      .login-forgetPassword { text-align: right; font-size: 12px;
        span:hover { color: aqua;}
      }
    }
  }
  .form-btn { display: flex; justify-content: center;}
}
</style>


