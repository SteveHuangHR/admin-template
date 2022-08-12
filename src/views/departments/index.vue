<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down" /> </span>

                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                    <el-dropdown-item>编辑部门</el-dropdown-item>
                    <el-dropdown-item>删除部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row> -->
        <TreeTools :data="company">
          <el-dropdown-item>添加子部门</el-dropdown-item>
        </TreeTools>
        <el-tree :data="list" :props="{ label: 'name' }" default-expand-all>
          <TreeTools slot-scope="{ data }" :data="data">
            <el-dropdown-item>添加子部门</el-dropdown-item>
            <el-dropdown-item>编辑部门</el-dropdown-item>
            <el-dropdown-item>删除部门</el-dropdown-item>
          </TreeTools>
        </el-tree>
      </el-card>
    </div>
  <add-dept></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments.js'
import { tranListToTreeDate } from '@/utils/index.js'
import AddDept from './components/add-dept.vue'
export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDept
  },
  props: {},
  data() {
    return {
      company: { name: '传智播客', manager: '负责人' },
      list: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ]
    }
  },
  async created() {
    const res = await getDepartments()
    this.company.name = res.companyName
    this.list = tranListToTreeDate(res.depts, '')
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
