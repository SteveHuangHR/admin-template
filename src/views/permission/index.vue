<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <el-button
          slot="after"
          type="primary"
          size="small"
          @click="onAdd({ type: 1, pid: '0' })"
        >添加权限</el-button>
      </PageTools>
      <el-table border stripe row-key="id" :data="list">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column
          label="标识"
          align="center"
          prop="code"
        ></el-table-column>
        <el-table-column label="描述" align="center" prop="description">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <el-button
              v-if="row.type"
              type="text"
              @click="onAdd({ type: 2, pid: row.id })"
            >添加</el-button>
            <el-button type="text" @click="onUpdata(row.id)">编辑</el-button>
            <el-button type="text" @click="onDel(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddPerm
        v-if="showDialog"
        ref="addPermRef"
        :visible="showDialog"
        :title="isEdit ? '编辑权限' : '新增权限'"
        @close="showDialog = false"
        @success="getPermissionList"
      ></AddPerm>
    </div>
  </div>
</template>

<script>
import { tranListToTreeDate } from '@/utils'
import {
  delPermission,
  getPermissionDetail,
  getPermissionList
} from '@/api/permission.js'
import AddPerm from './components/add-perm.vue'
export default {
  name: 'Permission',
  components: { AddPerm },
  props: {},
  data() {
    return {
      list: [],
      showDialog: false,
      isEdit: false
    }
  },
  created() {
    this.getPermissionList()
  },
  mounted() {},
  methods: {
    onAdd(data) {
      this.isEdit = false
      this.showDialog = true
      this.$nextTick(() => {
        Object.assign(this.$refs.addPermRef.form, data)
      })
    },
    onDel(id) {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async(action) => {
          await delPermission(id)
          // 提示成功
          this.$message.success('删除成功')
          // 刷新 列表
          this.getPermissionList()
        })
        .catch(() => {})
    },
    onUpdata(id) {
      this.isEdit = true
      this.showDialog = true
      this.$nextTick(async() => {
        this.$refs.addPermRef.form = await getPermissionDetail(id)
      })
    },
    async getPermissionList() {
      this.list = tranListToTreeDate(await getPermissionList(), '0')
    }
  }
}
</script>

<style lang="scss" scoped></style>
