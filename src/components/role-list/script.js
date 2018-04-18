export default {
  created () {
    this.loadRoles()
  },
  data () {
    return {
      roleList: [],
      addRoleDialog: false,
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    /**
     * 加载角色列表
     */
    async loadRoles () {
      const res = await this.$http.get('/roles')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.roleList = data
      }
    },

    /**
     * 《添加角色》
     * 1. 为添加按钮注册点击事件处理函数
     * 2. 弹出添加角色的对话框
     * 3. 布局添加角色对话框
     * 4. 初始化表单对象成员
     *    将表单对象成员绑定到对话框表单中
     * 5. 为确定按钮注册点击事件
     * 6. 获取表单数据
     * 7. 发起添加角色的请求
     * 8. 根据服务器响应做交互处理
     */

    async handleAddRole () {
      const res = await this.$http.post('/roles', this.addRoleForm)
      const {data, meta} = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加角色成功'
        })

        // 关闭对话框
        this.addRoleDialog = false

        // 清空添加角色的表单数据
        for (let key in this.addRoleForm) {
          this.addRoleForm[key] = ''
        }

        // 重新加载角色列表数据
        this.loadRoles()
      }
    },

    /**
     * 《删除角色》
     * 1. 注册删除按钮的点击事件处理函数
     *    将要删除的角色 id 传递到事件处理函数
     * 2. 弹框提示用户是否删除
     * 3. 拿到删除函数接收到的角色 id
     * 4. 发起请求执行删除操作
     * 5. 根据响应做出交互
     */

    async handleRemoveRole (role) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/roles/${role.id}`)
        const {data, meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除角色成功'
          })

          // 重新加载角色列表数据
          this.loadRoles()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
