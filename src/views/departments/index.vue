<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools :data="company">
          <el-dropdown-item>添加子部门</el-dropdown-item>
        </TreeTools>
        <el-tree :data="list" :props="{ label: 'name' }" default-expand-all>
          <TreeTools slot-scope="{ data }" :data="data">
            <el-dropdown-item @click.native="onAdd(data)">添加子部门</el-dropdown-item>
            <el-dropdown-item @click.native="onUpdate(data)">编辑部门</el-dropdown-item>
            <el-dropdown-item @click.native="onDel(data.id)">删除部门</el-dropdown-item>
          </TreeTools>
        </el-tree>
      </el-card>
    </div>
    <!-- <add-dept :show-dialog="showDialog" @update-show-dialog='showDialog=$event' ></add-dept> -->
    <add-dept :show-dialog.sync="showDialog" :node="currentNodes" @success="getDepartments" ref='addDeptRef'></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { delDepartment, getDepartments, getDepartmentById } from '@/api/departments.js'
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
      showDialog: false, // 控制新增对话框显示
      currentNodes: {}, // 当前操作部门
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
  methods: {
    async  getDepartments() {
      const res = await getDepartments()
      this.company.name = res.companyName
      this.list = tranListToTreeDate(res.depts, '')
    },
    onAdd(node) {
      this.showDialog = true
      this.currentNodes = node
    },
    async onUpdate(node) {
      this.showDialog = true
      this.$refs.addDeptRef.form = await getDepartmentById(node.id)
      this.currentNodes = node
    },
    onDel(id) {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async action => {
        await delDepartment(id)
        // 提示成功
        this.$message.success('删除成功')
        // 刷新 列表
        this.getDepartments()
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
