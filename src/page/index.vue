<template>
  <div>
    <div v-for="(val, key) in obj">
      <span v-translate="key"></span>
      <span v-text="val"></span>
      <span v-customunit="key"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      obj: {
        money: 555,
        wages: 32202,
        speed: 10
      }
    }
  },
  methods: {
  }
}
</script>
