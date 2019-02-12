<template>
  <div class="login">
    <div class="login-con">
      <el-card :body-style="{ padding: '16px' }">
        <div slot="header" class="login-con-header">欢迎登录</div>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import LoginForm from './login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      console.log(userName, password)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/login-bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header{
          color: #17233d;
          font-size: 14px;
          font-weight: 700;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}

</style>
