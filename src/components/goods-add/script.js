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
        goods_weight: ''
      }
    }
  },
  methods: {
    handleCascaderChange (val) {
      this.prodForm.goods_cat = val.join(',')
    }
  },
  components: {
    CategoryCascader
  }
}
