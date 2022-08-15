<template>
  <div>
    <el-dialog
      :visible="showDialog"
      v-bind="$attrs"
      :title="form.id?'编辑部门':'新增部门'"
      v-on="$listeners"
      @open="onOpen"
      @close="close"
    >
      <el-form
        ref="fromRef"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入部门名称"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input
            v-model="form.code"
            placeholder="请输入部门编码"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            v-model="form.manager"
            placeholder="请选择部门负责人"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in managerOptions"
              :key="index"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="form.introduce"
            type="textarea"
            placeholder="请输入部门介绍"
            :autosize="{ minRows: 4, maxRows: 4 }"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getEmplyeeSimple } from '@/api/user.js'
import { getDepartments, addDepartment, updateDepartmentById } from '@/api/departments.js'
export default {
  components: {},
  inheritAttrs: false,
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    node: {
      type: Object,
      required: true
    }
  },
  data() {
    const validateName = async(rule, value, callback) => {
      const name = this.form.name
      const { depts } = await getDepartments()
      let brother
      if (this.form.id) {
        // const { depts } = await getDepartments()
        brother = depts.filter(t => t.pid === this.node.pid && t.id !== this.node.id)
      } else {
        const parent = this.node
        // brother = parent.children
        brother = depts.filter(t => t.pid === parent.id)
      }

      const f = brother ? brother.find(t => t.name === name) : false
      f ? callback(new Error('存在重复名称')) : callback()
    }
    const validateCode = async(rule, value, callback) => {
      // 部门编码在整个模块中不允许重复
      const code = this.form.code
      const { depts } = await getDepartments()
      let f
      if (this.form.id) {
        // 编辑，排查当前部门，允许自己修改自己
        f = depts.filter(t => t.id !== this.form.id).find(t => t.code === code)
      } else {
        // 新增
        f = depts.find(t => t.code === code)
      }
      f ? callback(new Error('存在重复编码')) : callback()
    }
    return {
      form: {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入部门名称',

            trigger: 'blur'
          },
          {
            pattern: /^.{1,15}$/,
            message: '长度在1-50个字符',
            trigger: 'blur'
          },
          { validator: validateName, trigger: 'blur' }
        ],
        code: [
          {
            required: true,
            message: '请输入部门编码',
            trigger: 'blur'
          },
          {
            pattern: /^.{1,15}$/,
            message: '长度在1-50个字符',
            trigger: 'blur'
          },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [
          {
            required: true,
            message: '请选择部门负责人',
            trigger: 'change'
          }
        ],
        introduce: [
          {
            required: true,
            message: '请输入部门介绍',
            trigger: 'blur'
          },
          {
            pattern: /^.{1,300}$/,
            message: '长度在1-300个字符',
            trigger: 'blur'
          }
        ]
      },
      managerOptions: [
        {
          label: '选项一',
          value: 1
        }
      ]
    }
  },
  computed: {},
  watch: {},
  async created() {
    // const res = await getEmplyeeSimple()
    // console.log(res)
    this.managerOptions = await getEmplyeeSimple()
  },
  mounted() {},
  methods: {
    onOpen() {},
    close() {
      // 清空表单
      this.$refs['fromRef'].resetFields()
      // 清空字段
      this.form = {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      }
      // 关闭对话框
      // this.$emit('update-show-dialog', false)
      this.$emit('update:showDialog', false)
    },
    handelConfirm() {
      this.$refs['fromRef'].validate(async valid => {
        if (!valid) return
        if (this.form.id) {
          await updateDepartmentById(this.form)
        } else {
          // 新增
          await addDepartment({
            ...this.form,
            pid: this.node.id
          })
        }

        // 提示成功
        this.$message.success('添加成功')
        // 刷新列表
        this.$emit('success')
        this.close()
      })
    }
  }
}
</script>
<style></style>
