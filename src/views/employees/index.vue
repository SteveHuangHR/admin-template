<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="before">共计x条 </span>
        <template #after>
          <el-button size="small" type="danger">普通excel导出</el-button>
          <el-button size="small" type="info">复杂表头excel导出</el-button>
          <el-button size="small" type="success">excel导入</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
          <el-table-column label="账户状态" sortable="" prop="enableState" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="end">
          <el-pagination
            layout="prev, pager, next"
            :total="page.total"
            :page-size="page.size"
            @current-change="onCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees.js'
export default {
  name: 'Employees',
  components: {},
  props: {},
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 5,
        total: 0
      }
    }
  },
  created() {
    // this.info = await geEmployeeList(this.$store.state.user.userInfo.companyId)
    this.getEmployeeList()
  },
  mounted() {},
  methods: {
    onCurrentChange(val) {
      this.page.page = val
      this.getEmployeeList()
    },
    async getEmployeeList() {
      const res = await getEmployeeList(this.page)
      // console.log(res)
      this.page.total = res.total
      this.list = res.rows
    }
  }
}
</script>

<style></style>
