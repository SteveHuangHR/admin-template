<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-upload
        action
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :class="{ disabled: fileList.length > 0 }"
        :on-change="handleChange"
        :http-request="handleRequest"
        :before-upload="handleBeforeUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-progress v-if="started" :percentage="percent" style="width:200px"></el-progress>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
var COS = require('cos-js-sdk-v5')
var cos = new COS({
  SecretId: 'AKID4yc08zYrtgCRP6WeV6WgZFemcBTUEhto',
  SecretKey: 'e17wVu3vXswiDRP5VeW7RUHm0xd2A1dy'
})
export default {
  name: 'ImageUpload',
  props: {},
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      percent: 0,
      started: false,
      finished: true
    }
  },
  computed: {},
  methods: {
    handleRemove(file) {
      const index = this.fileList.findIndex((t) => t.uid === file.uid)
      this.fileList.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange(file) {
      // console.log(file)
      this.fileList.push({ url: file.url })
    },
    handleRequest(options) {
      const file = options.file
      this.started = true
      this.finished = false
      cos.putObject({
        Bucket: 'rzzt-1313400484', /* 必须 */
        Region: 'ap-chengdu', /* 存储桶所在地域，必须字段 */
        Key: Date.now() + file.name, /* 必须 */
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
          this.percent = progressData.percent * 100
        }
      }, (err, data) => {
        console.log(err || data)
        // this.fileList.push({ url: 'http://' + data.Location })
        this.fileList[0].url = 'http://' + data.Location
        this.started = false
        this.finished = true
      })
    },
    handleBeforeUpload({ type, size }) {
      if (!['image/jpeg', 'image/gif', 'image/bmp', 'image/png'].includes(type)) {
        this.$message.error('图片格式不对')
        return false
      }
      if (size > 5 * 1024 * 1024) {
        this.$message.error('图片太大')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .disabled .el-upload--picture-card {
  display: none !important;
}
</style>
