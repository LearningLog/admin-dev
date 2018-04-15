<template>
<div class="user-list-wrap">
  <el-row>
    <el-col :span="24">
      <el-breadcrumb class="user-list-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
  <el-row class="user-list-search">
    <el-col :span="8">
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"></el-button>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="success" plain>添加用户</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      label="用户状态"
      width="100">
      <template slot-scope="scope">
        <!-- 我们在这里可以通过 scope.row 拿到当前遍历行对象 -->
        <!--

          @change="handleStateChange" 在事件处理函数中可以接收得到 Switch 开关的选中状态
          @change="handleStateChange(scope.row.id)" 直接调用绑定的话就得不到事件参数 Switch 开关的选中状态

          所以我们这里：
            @change="(val) => {}" 直接绑定了一个匿名箭头函数，注意不要调用
            (val) => {} 是当 el-switch 组件 change 的事件会自动调用，然后开关的选中状态传递给了 匿名小函数
            我们就可以在这个函数内部调用我们自己的指定的处理函数
            所以：@change="(val) => {handleStateChange(val, scope.row)}"
         -->
        <el-switch
          v-model="scope.row.mg_state"
          @change="(val) => {handleStateChange(val, scope.row)}"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--
    你要做的就是告诉这个分页组件：
    每页多大
        :page-sizes="[1, 2, 3, 4]" 每页大小
        一共有多少条记录 :total="10"
    分页组件的页码发生改变的时候会自动调用 handleCurrentChange
    所以我们要做的就是在页码发生改变的时候 handleCurrentChange 方法中加载对应页码的数据

    当用户选择切换页码改变的时候，就会触发 handleSizeChange 方法执行
    我们要做的就是在 handleSizeChange 方法中发请求拿到对应的页码数据
        loadUsersByPage(1, 每页大小)

    current-page 用来配置指定页码高亮
   -->
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="[5, 8]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalSize">
  </el-pagination>
</div>
</template>

<script>
export default {
  async created () {
    this.loadUsersByPage(1)
  },
  data () {
    return {
      searchText: '',
      tableData: [], // 表格列表数据
      totalSize: 0, // 总记录数据
      currentPage: 1, // 当前页码
      pageSize: 5 // 当前每页大小
    }
  },
  methods: {
    async handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadUsersByPage(1, pageSize)

      // 每页大小改变之后，数据回归到了第1页
      // 我们的页码的高亮状态也应用回归到第1页
      // 我们这里就可以使用 this.currentPage 来控制
      this.currentPage = 1
    },
    async handleCurrentChange (currentPage) {
      this.loadUsersByPage(currentPage)
    },
    handleSearch () {
      this.loadUsersByPage(1)
    },
    async loadUsersByPage (page) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: this.pageSize,
          query: this.searchText // 根据搜索文本框的内容来搜索
        }
      })
      const {users, total} = res.data.data

      this.tableData = users

      // 把真实的总记录交给分页插件
      // 分页插件会根据总记录数和每页大小自动完成分页效果
      this.totalSize = total
    },

    async handleStateChange (state, user) {
      const {id: userId} = user
      // 拿到用户 id
      // 拿到 Switch 开关的选中状态 state
      // 发起请求改变状态
      const res = await this.$http.put(`/users/${userId}/state/${state}`)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态${state ? '启用' : '禁用'}成功`
        })
      }
    }
  }
}
</script>

<style>
.user-list-breadcrumb {
  line-height: 3;
}

.user-list-search {
  margin-bottom: 10px;
}
</style>
