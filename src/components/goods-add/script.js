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
    }
  },
  components: {
    CategoryCascader
  }
}
