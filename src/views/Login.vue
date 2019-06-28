<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <el-form
        ref="loginForm"
        class="login-form"
        :model="loginForm"
        label-width="80px"
        label-position="top"
      >
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">登录</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      }
    };
  }
};
</script>

<style>
.row-bg {
  height: 100%;
  background-color: #2d434c;
}
.login-form {
  background-color: #fff;
  padding: 40px 20px;
  border-radius: 10px;
  min-width: 400px;
}
</style>
