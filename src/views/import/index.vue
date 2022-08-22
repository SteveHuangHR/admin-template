<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel :on-success="onSuccess"></UploadExcel>
    </div>
  </div>
</template>

<script>
import { importEmployee } from '@/api/user'

export default {
  name: 'Import',
  props: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {
    async onSuccess({ header, results }) {
      console.log(header, results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const data = []
      results.forEach(t => {
        const item = {}
        for (var key in t) {
          const newKey = userRelations[key]
          item[newKey] = t[key]
        }
        data.push(item)
      })
      await importEmployee(data) // 调用导入接口
      this.$message.success('操作成功')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

