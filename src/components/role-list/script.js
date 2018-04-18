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
    async loadRoles () {
      const res = await this.$http.get('/roles')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.roleList = data
      }
    },

    /**
     * 添加角色
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
    }
  }
}
