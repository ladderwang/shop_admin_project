<template>
  <el-container>
    <el-header>
      <div class="logo">
        <img src="./../assets/logo.png" alt>
      </div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="login-out">
        <span>欢迎上海前端31期星曜会员</span>
        <a href="javaScript:;">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              default-active="1-1"
              active-text-color="#ffd04b"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              unique-opened
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">
                    <i class="el-icon-menu"></i>用户列表
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1">
                    <i class="el-icon-menu"></i>角色列表
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <i class="el-icon-menu"></i>权限列表
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">
                    <i class="el-icon-menu"></i>商品列表
                  </el-menu-item>
                  <el-menu-item index="3-2">
                    <i class="el-icon-menu"></i>分类参数
                  </el-menu-item>
                  <el-menu-item index="3-3">
                    <i class="el-icon-menu"></i>商品分类
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>订单管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">
                    <i class="el-icon-menu"></i>订单列表
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>数据统计</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">
                    <i class="el-icon-menu"></i>数据报表
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-menu-item-group__title {
  padding: 0px 0px 0px 20px !important;
}
.el-container.is-vertical {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
.el-header h1 {
  font-size: 28px;
  color: #fff;
  font-weight: bolder;
}
.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: left;
  line-height: 200px;
}
.el-header .login-out {
  font-weight: 700;
}
.el-header .login-out a {
  color: #daa520;
  margin-left: 5px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
