export default {
  created () {
    this.loadCategories(1)
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      totalSize: 0,
      pageSize: 10,
      loading: true,
      addDialog: false,
      addForm: {},
      categoryCascaderOptions: [],
      selectedOptions: []
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadCategories(1)
      this.currentPage = 1 // 让页码高亮回归到第一页
    },

    handleCurrentChange (page) {
      this.loadCategories(page)
    },

    async loadCategories (page) {
      this.loading = true // 发请求之前加载 loading 效果
      const res = await this.$http.get('/categories', {
        params: {
          type: 3,
          pagenum: page,
          pagesize: this.pageSize
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.tableData = data.result
        this.totalSize = data.total
        this.loading = false // 取消 loading
      }
    },

    /**
     * 级联选择器改变的事件处理函数
     */

    handleCascaderChange (val) {
      console.log(val)
    },

    /**
     * 《显示添加分类对话框》
     * 1. 加载二级分类列表数据到级联选择器中
     */

    async handleShowAddCategory () {
      const res = await this.$http.get('/categories', {
        params: {
          type: 2
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.categoryCascaderOptions = data
        this.addDialog = true
      }
    }
  }
}
