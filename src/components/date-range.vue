<!-- 日期范围选择反馈组件 -->
<template>
  <span class="datarange">
    <el-date-picker v-model="date_range" :editable="false" type="daterange" :align="align" placeholder="选择日期范围" :picker-options="pickerOptions"></el-date-picker>
    <!-- <date-range v-model="" connectors="|" align="left"></date-range> -->
    <!-- v-model:绑定的值，connectors范围连接的符号，align:对齐方式 -->
  </span>
</template>

<script>
export default {
  props: {
    value: null, // 值
    connectors: null, // 连接符号，值:-,|,+,到,＊等
    align: null // left, center, right
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      date_range: null
    }
  },
  created () {
    if (this.value) {
      // this.date_range = this.value
    }
  },
  computed: {
    date_range: function () {
    }
  },
  watch: {
    value () {
      // console.log('value:' + this.value)
      if (this.value === null) { // 如果value被置为空，那么this.date_range也置为空
        this.date_range = null
        // console.log('value:' + this.date_range)
      }
    },
    date_range () {
      // console.log('date_range:' + this.date_range)
      if (this.date_range !== undefined && this.date_range !== null && this.date_range.toString() !== ',') {
        let dateRange = this.$customMethods.switchDateYYTM(this.date_range[0]) + '' + this.connectors + '' + this.$customMethods.switchDateYYTM(this.date_range[1])
        console.log(dateRange)
        this.$emit('input', dateRange)
        // this.$emit('input', this.date_range)
      }
    }
  }
}
</script>
<style>
.datarange .el-date-range-picker {
  width: auto !important;
}
</style>
