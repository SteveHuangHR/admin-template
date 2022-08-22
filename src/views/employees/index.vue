<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="before">共计x条 </span>
        <template #after>
          <el-button
            size="small"
            type="danger"
            @click="onExport"
          >普通excel导出</el-button>
          <el-button
            size="small"
            type="info"
            @click="onExport"
          >复杂表头excel导出</el-button>
          <el-button
            size="small"
            type="success"
            @click="$router.push('/import')"
          >excel导入</el-button>
          <el-button
            size="small"
            type="primary"
            @click="showAddDialog = true"
          >新增员工</el-button>
        </template>
      </PageTools>
      <!-- --------------放置表格和分页----------------- -->
      <el-card>
        <el-table border :data="list">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像">
            <img
              slot-scope="{ row }"
              v-imgerror="require('@/assets/common/head.jpg')"
              :src="row.staffPhoto"
              style="
                border-radius: 50%;
                width: 100px;
                height: 100px;
                padding: 10px;
              "
              @click="onShowPhoto(row)"
            />
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment">
            <template v-slot="{ row }">
              {{ row.formOfEmployment | formOfEmployment }}
            </template>
          </el-table-column>
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template v-slot="{ row }">
              <!-- v-model="row.enableState === 1" -->
              <el-switch :value="row.enableState === 1" disabled> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
              >查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button
                type="text"
                size="small"
                @click="onAssignRole(row.id)"
              >角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="onDel(row.id)"
              >删除</el-button>
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

    <el-dialog title="图片预览" :visible.sync="showQrcodeDialog">
      <qrcode-vue :value="currentRow.staffPhoto"></qrcode-vue>
    </el-dialog>

    <!-- ------------------新增员工 ----------------------->
    <el-dialog
      :visible="showAddDialog"
      v-bind="$attrs"
      title="新增员工"
      v-on="$listeners"
      @open="onOpen"
      @close="close"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="120px"
      >
        <el-form-item label="姓名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入单行文本姓名"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机号"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="form.timeOfEntry"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{ width: '100%' }"
            placeholder="请选择入职时间"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            v-model="form.formOfEmployment"
            placeholder="请选择聘用形式"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in formOfEmploymentOptions"
              :key="index"
              :label="item.value"
              :value="item.id"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input
            v-model="form.workNumber"
            placeholder="请输入工号"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input
            v-model="form.departmentName"
            placeholder="请输入部门"
            clearable
            :style="{ width: '100%' }"
            @focus="getDeptsList"
          >
          </el-input>
          <el-tree
            v-if="showDeptsTree"
            :data="deptsList"
            :props="{ label: 'name' }"
            default-expand-all
            @node-click="handelNodeClick"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="form.correctionTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{ width: '100%' }"
            placeholder="请选择转正时间"
            clearable
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-row>
    </el-dialog>
    <el-dialog title="分配角色" :visible="showAssignRoleDialog">
      <el-checkbox-group v-model="checkRoleList">
        <el-checkbox
          v-for="(item, index) in roleList"
          :key="index"
          :label="item.id"
        >{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="showAssignRoleDialog = false">取消</el-button>
        <el-button
          type="primary"
          @click="handleAssignRoleConfirm"
        >确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEmployeeList,
  addEmployee,
  delEmployee,
  assignRoles
} from '@/api/employees.js'
import EmployeeEnum from '@/api/constant/employees.js'
import QrcodeVue from 'qrcode.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeDate } from '@/utils'
import { pick } from 'lodash'
import { formatDate } from '@/filters'
import { getRoleList } from '@/api/setting'
import { getEmplyeeBaseInfo } from '@/api/user'
export default {
  name: 'Employees',
  components: {
    QrcodeVue
  },
  filters: {
    formOfEmployment(val) {
      const f = EmployeeEnum.informaltype.find((t) => t.id === val)
      return f ? f.value : '未知'
    }
  },
  props: {},
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 3,
        total: 0
      },
      showAddDialog: false,
      showQrcodeDialog: false,
      currentRow: {},
      form: {
        username: undefined,
        mobile: undefined,
        timeOfEntry: null,
        formOfEmployment: undefined,
        workNumber: undefined,
        departmentName: undefined,
        correctionTime: null
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入单行文本姓名',
            trigger: 'blur'
          },
          {
            pattern: /^.{1,4}$/,
            message: '用户名1-4位',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        timeOfEntry: [
          {
            required: true,
            message: '请选择入职时间',
            trigger: 'change'
          }
        ],
        formOfEmployment: [
          {
            required: true,
            message: '请选择聘用形式',
            trigger: 'change'
          }
        ],
        workNumber: [
          {
            required: true,
            message: '请输入工号',
            trigger: 'blur'
          }
        ],
        departmentName: [
          {
            required: true,
            message: '请输入部门',
            trigger: 'change'
          }
        ],
        correctionTime: [
          {
            required: true,
            message: '请选择转正时间',
            trigger: 'change'
          }
        ]
      },
      formOfEmploymentOptions: EmployeeEnum.informaltype,
      deptsList: [],
      showDeptsTree: false,
      checkRoleList: [],
      showAssignRoleDialog: false,
      roleList: []
    }
  },
  created() {
    // this.info = await geEmployeeList(this.$store.state.user.userInfo.companyId)
    this.getEmployeeList()
  },
  mounted() {},
  methods: {
    async onAssignRole(id) {
      this.currentUserId = id
      const res = await getRoleList({ page: 1, pagesize: 100 })
      const { roleIds } = await getEmplyeeBaseInfo(id)
      this.checkRoleList = roleIds
      this.roleList = res.rows
      this.showAssignRoleDialog = true
    },
    async handleAssignRoleConfirm() {
      await assignRoles({
        id: this.currentUserId,
        roleIds: this.checkRoleList
      })
      this.$message.success('操作成功')
      this.showAssignRoleDialog = false
    },
    onExport() {
      import('@/vendor/Export2Excel').then(async(excel) => {
        const headers = {
          手机号: 'mobile',
          姓名: 'username',
          入职日期: 'timeOfEntry',
          聘用形式: 'formOfEmployment',
          转正日期: 'correctionTime',
          工号: 'workNumber',
          部门: 'departmentName'
        }
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.page.total
        })
        console.log(rows)
        const data = rows.map((t) => {
          const n = pick(t, Object.values(headers))
          n.timeOfEntry = formatDate(n.timeOfEntry)
          n.correctionTime = formatDate(n.correctionTime)
          n.formOfEmployment = this.$options.filters.formOfEmployment(
            n.formOfEmployment
          )
          return Object.values(n)
        })
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xls' // 非必填
        })
      })
    },
    handelNodeClick(data) {
      console.log(data)
      this.form.departmentName = data.name
      this.showDeptsTree = false
    },
    async getDeptsList() {
      // const res = await getDepartments()
      // this.deptsList = tranListToTreeDate(res.depts, '')
      this.deptsList = tranListToTreeDate((await getDepartments()).depts, '')
      this.showDeptsTree = true
    },
    onOpen() {},
    close() {
      // this.$emit('update:visible', false)
      this.$refs['formRef'].resetFields()
      this.showAddDialog = false
      this.form = this.$options.data().form
    },
    onDel(id) {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async(action) => {
          await delEmployee(id)
          // 提示成功
          this.$message.success('删除成功')
          // 刷新 列表
          this.getEmployeeList()
        })
        .catch(() => {})
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async(valid) => {
        if (!valid) return
        await addEmployee(this.form)
        this.$message.success('操作成功')
        // 刷新列表
        this.getEmployeeList()
        this.close()
      })
    },
    onShowPhoto(row) {
      this.currentRow = row
      this.showQrcodeDialog = true
    },
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

<style scope lang="scss">
.el-dialog__body {
  display: flex;
  justify-content: center;
}
</style>
