<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="keyword">
          <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <!-- 添加用户 -->
      <el-col :span="6">
        <el-button type="success" plain @click="addUserdalogShow">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
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
        <template v-slot="{row}">
          <el-button type="primary" @click="editUser(row.id)" plain icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" @click="del(row.id)" plain icon="el-icon-delete" size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" size="mini">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="pageChange"
      background
      layout="prev, pager, next"
      :page-size="3"
      :total="total"
    ></el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addUserVisible" @close="$refs.addUserForm.resetFields()">
      <el-form
        :model="addUserForm"
        :rules="addUserRules"
        ref="addUserForm"
        label-width="100px"
        class="demo-addUserForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible=false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editUserVisible">
      <el-form
        :model="editUserForm"
        :rules="editUserRules"
        ref="editUserForm"
        label-width="100px"
        class="demo-editUserForm"
      >
        <el-form-item label="用户名">
          <el-tag type="info">{{editUserForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="finishEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      keyword: "",
      addUserVisible: false,
      editUserVisible: false,
      total: 0,
      pagenum: 1,
      // 添加用户的所需数据
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 添加用户的校验规则
      addUserRules: {
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
            min: 6,
            max: 12,
            message: "长度必须为5-12个字符",
            trigger: "change"
          }
        ],
        email: [
          {
            required: false,
            message: "请输入正确的邮箱地址",
            trigger: "change",
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
          }
        ],
        mobile: [
          {
            required: false,
            message: "请输入正确的手机号码",
            trigger: "change",
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
          }
        ]
      },
      // 编辑用户数据
      editUserForm: {
        username: "",
        email: "",
        mobile: ""
      },
      editUserRules: {
        email: [
          {
            required: false,
            message: "请输入正确的邮箱地址",
            trigger: "change",
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
          }
        ],
        mobile: [
          {
            required: false,
            message: "请输入正确的手机号码",
            trigger: "change",
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
          }
        ]
      }
    };
  },
  async created() {
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      let res = await this.$http({
        url: "users",
        params: {
          pagenum: 1,
          pagesize: 3,
          query: this.keyword
        }
      });
      if (res.data.meta.status === 200) {
        this.userList = res.data.data.users;
        this.total = res.data.data.total;
        console.log(this.total);
      }
    },
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
    },
    // 删除用户功能  根据用户的id的删除数据
    del(id) {
      this.$confirm("你确定要删除该用户数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          let res = await this.$http({
            url: `users/${id}`,
            method: "delete"
          });
          if (res.data.meta.status === 200) {
            this.getUserList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 筛选功能   传入了一个query参数  绑定keyword
    search() {
      this.getUserList();
    },
    // 添加用户列表对话框的显示
    addUserdalogShow() {
      this.addUserVisible = true;
    },
    // 添加用户功能
    async addUser() {
      await this.$refs.addUserForm.validate();
      let res = await this.$http({
        url: "users",
        method: "post",
        data: this.addUserForm
      });
      if (res.data.meta.status === 201) {
        this.getUserList();
        this.$message({
          type: "success",
          message: res.data.meta.msg
        });
        this.$refs.addUserForm.resetFields();
        this.addUserVisible = false;
      }
    },
    // 编辑用户功能
    async editUser(id) {
      this.editUserVisible = true;
      let res = await this.$http({
        url: `users/${id}`
      });
      if (res.data.meta.status === 200) {
        this.editUserForm = res.data.data;
      }
    },
    // 编辑完成功能
    async finishEdit() {
      let res = await this.$http({
        url: `users/${this.editUserForm.id}`,
        method: "put",
        data: this.editUserForm
      });
      if (res.data.meta.status === 200) {
        this.$message({
          type: "success",
          message: res.data.meta.msg,
          duration: 1000
        });
        this.getUserList();
        this.editUserVisible = false;
      }
    },
    // 分页功能
    pageChange(value) {
      this.pagenum = value;
      this.getUserList();
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

