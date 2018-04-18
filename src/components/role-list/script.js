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
      },
      editRoleDialog: false,
      editRoleForm: {
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
    },

    /**
     * 《编辑角色》
     * 一：显示编辑弹框，在弹框中加载要编辑的角色信息
     *   1. 为编辑按钮注册点击事件
     *      把要编辑的角色 id 传递到处理函数中
     *   2. 根据角色 id 发起请求，拿到角色的信息
     *   3. 将角色信息绑定输出到表单中进行展示
     *
     * 二：提交表单，完成更新操作
     *   1. 为确定按钮注册点击事件
     *   2. 拿到表单数据
     *   3. 发送请求
     *   4. 根据响应做交互
     */

    async showEditRoleDialog (role) {
      const res = await this.$http.get(`/roles/${role.id}`)
      const {data, meta} = res.data
      if (meta.status === 200) {
        // 把响应数据赋值给编辑角色表单对象
        this.editRoleForm = data

        // 显示编辑角色对话框
        this.editRoleDialog = true
      }
    },

    async handleEditRole () {
      const res = await this.$http.put(`/roles/${this.editRoleForm.roleId}`, this.editRoleForm)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新角色成功'
        })

        // 重新加载列表数据
        this.loadRoles()

        // 关闭对话框
        this.editRoleDialog = false
      }
    }
  }
}
