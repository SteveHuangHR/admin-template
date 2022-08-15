<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs>
        <el-tab-pane label="角色管理">
          <el-row>
            <el-button type="primary" size="small" @click="showDialog=true">新增角色</el-button>
          </el-row>
          <el-table
            :data="list"
            style="width: 100%; margin-top: 20px"
            border
            stripe
          >
            <el-table-column
              type="index"
              width="50"
              label="序号"
              align="center"
            >
            </el-table-column>
            <el-table-column label="角色" align="center" prop="name">
            </el-table-column>
            <el-table-column label="描述" align="center" prop="description">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template v-slot="{row}">
                <el-button type="success" size="small">分配权限</el-button>
                <el-button type="primary" size="small" @click="onUpdate(row.id)">编辑</el-button>
                <el-button type="danger" size="small" @click="onDel(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end">
            <el-pagination
              :page-size="page.pagesize"
              layout="prev, pager, next"
              :total="page.total"
              @current-change="onCurrentChange"
            >
            </el-pagination>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="公司信息">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form
            label-position="right"
            label-width="80px"
            style="width: 500px; margin: 30px 0 0 20px"
          >
            <el-form-item label="公司名称">
              <el-input v-model="info.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="info.companyAddress" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="info.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="info.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :visible="showDialog"
      v-bind="$attrs"
      :title="form.id?'编辑角色':'新增角色'"
      v-on="$listeners"
      @close="close"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入角色名称"
            clearable
            :style="{ width: '90%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="region">
          <el-input
            v-model="form.region"
            placeholder="请输入角色描述"
            clearable
            :style="{ width: '90%' }"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyInfo } from '@/api/user.js'
import { getRoleList, addRole, delRole, getRoleId, updataRole } from '@/api/setting.js'
export default {
  name: 'Setting',
  components: {},
  props: {},
  data() {
    return {
      showDialog: false,
      list: [],
      info: {},
      page: {
        page: 1,
        pagesize: 5,
        total: 0
      },
      form: {
        name: undefined,
        region: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur'
          }
        ],
        region: []
      }
    }
  },
  async created() {
    this.info = await getCompanyInfo(this.$store.state.user.userInfo.companyId)
    this.getRoleList()
  },
  mounted() {},
  methods: {
    async onUpdate(id) {
      this.showDialog = true
      this.form = await getRoleId(id)
    },
    onDel(id) {
      this.$confirm('确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async action => {
        await delRole(id)
        // 提示成功
        this.$message.success('删除成功')
        // 刷新 列表
        this.getRoleList()
      }).catch(() => {

      })
    },
    onCurrentChange(val) {
      this.page.page = val
      this.getRoleList()
    },
    async getRoleList() {
      const res = await getRoleList(this.page)
      // console.log(res)
      this.page.total = res.total
      this.list = res.rows
    },
    close() {
      this.$refs['formRef'].resetFields()
      this.showDialog = false
      // 清空表单数据
      this.form = this.$options.data().form
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        // 发请求
        if (this.form.id) {
          await updataRole(this.form)
        } else {
          await addRole(this.form)
        }

        // 提示成功
        this.$message.success('操作成功')
        // 刷新列表
        this.getRoleList()
        this.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
