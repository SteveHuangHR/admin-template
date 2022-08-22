<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen">
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入单行文本权限名称"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input
            v-model="form.code"
            placeholder="请输入权限标识"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="description">
          <el-input
            v-model="form.description"
            placeholder="请输入权限描述"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="开启" prop="enVisible" required>
          <el-switch
            v-model="form.enVisible"
            active-value="1"
            inactive-value="0"
          ></el-switch>
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
import { addPermission, updatePermission } from '@/api/permission'
export default {
  name: 'AddPerm',
  components: {},
  inheritAttrs: false,
  props: {
    // showDialog: {
    //   type: Boolean,
    //   required: true
    // }
  },
  data() {
    return {
      form: {
        name: undefined,
        code: undefined,
        description: undefined,
        enVisible: '0',
        type: 1,
        pid: '0'
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入单行文本权限名称',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入权限标识',
            trigger: 'blur'
          }
        ],
        description: []
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    close() {
      // this.$refs['formRef'].resetFields()
      this.$emit('close')
    },
    handelConfirm() {
      this.$refs['formRef'].validate(async(valid) => {
        if (!valid) return
        if (this.form.id) {
          await updatePermission(this.form)
        } else {
          await addPermission(this.form)
        }
        await addPermission(this.form)
        this.$message.success('操作成功')
        this.$parent.getPermissionList()
        this.close()
      })
    }
  }
}
</script>
<style></style>
