<template>
  <el-form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <el-form-item prop="userName" style="margin-bottom: 22px;">
      <el-input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <i class="el-icon-time"></i>
        </span>
      </el-input>
    </el-form-item>
    <el-form-item prop="password" style="margin-bottom: 22px;">
      <el-input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <i class="el-icon-time"></i>
        </span>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleSubmit" type="primary" style="width: 100%;">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: 'super_admin',
        password: '123456'
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.el-input-group__append, .el-input-group__prepend {
  padding: 0 10px;
}
</style>
