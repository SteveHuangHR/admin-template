<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" @change="onChange">
        <el-option
          v-for="t in yearList"
          :key="t"
          :value="t"
          :label="t"
        ></el-option>
      </el-select>
      <el-select v-model="currentMonth" size="small" @change="onChange">
        <el-option v-for="t in 12" :key="t" :value="t" :label="t"></el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template #dateCell="{ date }">
        <div>
          {{ date | formatDate("D") }}
          <div v-if="[0, 6].includes(date.getDay())" class="rest">休</div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'WorkCalendar',
  props: {},
  data() {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    // const yearList = []
    // for (var i = -5; i <= 5; i++) {
    //   yearList.push(currentYear + i)
    // }
    const yearList = Array.from(
      { length: 13 },
      (t, i) => new Date().getFullYear() + i - 6
    )
    return {
      yearList,
      currentYear,
      currentMonth,
      currentDate
    }
  },
  computed: {},
  methods: {
    onChange() {
      this.currentDate = new Date(this.currentYear + '-' + this.currentMonth)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 120px;
}
.el-select:first-child {
  margin-right: 10px;
}
::v-deep .el-calendar__header {
  display: none;
}
.rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
  text-align: center;
}
::v-deep .el-calendar-table .el-calendar-day {
  box-sizing: content-box;
  line-height: 85px;
  text-align: center;
}
::v-deep .el-calendar-table td {
  border: none !important;
}
</style>
