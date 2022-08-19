<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <ImageUpload></ImageUpload>
    <input ref="fileRef" type="file">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import QrcodeVue from 'qrcode.vue'
var COS = require('cos-js-sdk-v5')
var cos = new COS({
  SecretId: 'AKID4yc08zYrtgCRP6WeV6WgZFemcBTUEhto',
  SecretKey: 'e17wVu3vXswiDRP5VeW7RUHm0xd2A1dy'
})
export default {
  name: 'Dashboard',
  components: {
  },
  computed: {
    ...mapGetters(['name'])
  },
  data: function() {
    return {
      value: 'https://example.com'
    }
  },
  mounted() {
    this.$refs.fileRef.onchange = function() {
      const file = this.files[0]
      cos.putObject({
        Bucket: 'rzzt-1313400484', /* 必须 */
        Region: 'ap-chengdu', /* 存储桶所在地域，必须字段 */
        Key: Date.now() + file.name, /* 必须 */
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, function(err, data) {
        console.log(err || data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
