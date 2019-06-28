<template>
  <el-row type="flex" class="row-bg" justify="center" align="middle">
    <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <el-form
        ref="loginForm"
        class="login-form"
        :model="loginForm"
        label-width="80px"
        label-position="top"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
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
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "长度必须为5-12个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "长度必须为5-12个字符",
            trigger: "change"
          }
        ]
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
