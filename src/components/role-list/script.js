export default {
  created () {
    this.loadRoles()
  },
  data () {
    return {
      roleList: []
    }
  },
  methods: {
    async loadRoles () {
      const res = await this.$http.get('/roles')
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.roleList = data
      }
    }
  }
}
