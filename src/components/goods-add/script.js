import CategoryCascader from '@/common/category-cascader'

export default {
  created () {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {},
  components: {
    CategoryCascader
  }
}
