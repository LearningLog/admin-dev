import CategoryCascader from '@/common/category-cascader'

export default {
  created () {},
  data () {
    return {
      prodForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        is_promote: false
      }
    }
  },
  methods: {
    handleCascaderChange (val) {
      this.prodForm.goods_cat = val.join(',')
    },

    async handleAddProd () {
      const res = await this.$http.post('/goods', this.prodForm)
      const {data, meta} = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加商品成功'
        })
      }
    },

    handleTabClick (tab, event) {
      if (tab.label === '商品参数') {
        // 加载用户所选商品分类下的动态参数
        this.loadManyPrams()
      } else if (tab.label === '商品属性') {
        console.log('根据商品分类加载分类下的静态参数')
      }
    },

    /**
     * 加载商品分类下的动态参数
     */

    async loadManyPrams () {
      const categoryId = this.prodForm.goods_cat.split(',')[2]
      const res = await this.$http.get(`/categories/${categoryId}/attributes`, {
        params: {
          sel: 'many'
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        console.log(data)
      }
    }
  },
  components: {
    CategoryCascader
  }
}
