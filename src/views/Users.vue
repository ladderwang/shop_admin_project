<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userList" stripe style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template v-slot="{row}">
          <el-switch
            v-model="row.mg_state"
            @change="toggleStatus(row.id,row.mg_state)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" plain icon="el-icon-edit" size="mini"></el-button>
        <el-button type="danger" plain icon="el-icon-delete" size="mini"></el-button>
        <el-button type="success" icon="el-icon-check" size="mini">分配角色</el-button>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: []
    };
  },
  async created() {
    let res = await this.$http({
      url: "users",
      params: {
        pagenum: 1,
        pagesize: 5
      }
    });
    if (res.data.meta.status === 200) {
      this.userList = res.data.data.users;
    }
  },
  methods: {
    // 用户状态设置切换功能
    async toggleStatus(uId, state) {
      let res = await this.$http({
        url: `users/${uId}/state/${state}`,
        method: "put"
      });
      if (res.data.meta.status === 200) {
        this.$message({
          type: "success",
          message: res.data.meta.msg,
          duration: 1000
        });
        res.data.data.mg_state = state;
      }
    }
  }
};
</script>

<style>
.el-container .el-breadcrumb {
  height: 50px;
  background-color: #d4dae0;
  line-height: 50px;
  padding-left: 10px;
  font-size: 16px;
}
</style>

