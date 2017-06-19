<template>
  <div>
      <!-- <china-city :level="0" :max="2" :cls="'input_city'" v-model=""></china-city> -->
      <template v-if="is_disabled">
       <select v-for="(area_id, index) in areas" disabled="disabled" v-model="areas[index]" :class="cls" v-show="show_all || area_show[index]">
         <option :value="null">--请选择{{names[index]}}--</option>
         <option v-for="p in area_list[index]" v-text="p.name" :value="p.id"></option>
       </select>
      </template>
      <template v-else>
        <select v-for="(area_id, index) in areas" v-model="areas[index]" :class="cls" v-show="show_all || area_show[index]">
          <option :value="null">--请选择{{names[index]}}--</option>
          <option v-for="p in area_list[index]" v-text="p.name" :value="p.id"></option>
        </select>
      </template>
      <div v-show="false">{{_areaid}}</div>
  </div>
</template>

<script>
// <chinaCity :level="0" :max="2" :cls="'xxx'" v-model="dat.area_id" @changed="ddd=arguments[0]"></chinaCity>
export default {
  props: {
    value: null,
    cls: null,
    names: { default () { return ['省', '市', '区', '街道'] } },
    level: { default: 3 },
    show_all: { default: false },
    max: null,
    is_disabled: false
  },
  data () {
    return {
      area_show: [],
      areas: [],
      area_list: [],
      area_list_old: [],
      area_id: null,
      area_id_old: null,
      areainfo: [],
      areainfo_n: 0,
      area_max: null
    }
  },
  created () {
    this.area_max = this.max ? this.max : this.level
    this.areas = Array(this.area_max)
    this.area_show = [1].concat(Array(this.area_max - 1))
    this.area_list_old = Array(this.area_max)
    if (!this.value) {
      this._init()
    }
  },
  computed: {
    _areaid: function () {
      if (this.value && this.value !== this.area_id_old) {
        this._init()
      }
      return this.value
    }
  },
  methods: {
    _setAreaList (parent, level, init) {
      if (parent === 1 && init !== 1 || level >= this.area_max || !parent) {
      } else {
        this.$api.get('area', {parent: parent, display: init}, r => {
          this.area_list.splice(level, this.area_max - level, r.data.list)
        })
      }
    },
    _init () {
      if (this.value) {
        this.$api.get('areainfo', {id: this.value}, r => {
          this.areainfo = r.data.ids
          this.areainfo_n = 1
          this._setAreaList(1, 0, 1)
          this.$emit('initFinish') // 初始加载完成事件
        })
      } else {
        this._setAreaList(1, 0, 1)
      }
    }
  },
  watch: {
    areas (newVal) {
      for (let i = 0; i <= newVal.length; i++) {
        if (newVal[i] !== this.area_list_old[i]) {
          this._setAreaList(newVal[i], i + 1)
          if (this.level === 0 || i === this.level - 1) {
            this.$emit('input', newVal[i])
            this.area_id_old = newVal[i]
          } else {
            this.$emit('input', null)
          }
          this.$emit('changed', newVal.slice(0, i + 1))
          this.area_list.fill(null, i + 1)
          this.areas.fill(null, i + 1)
          this.area_show.fill(1).fill(0, this.areas[0] ? i + 2 : 1)
          break
        }
      }
      this.area_list_old = this.areas.slice()
    },
    area_list (newVal) {
      if (this.areainfo_n <= this.areainfo.length) {
        this.areas = this.areainfo.slice(0, this.areainfo_n)
          .concat(Array(this.area_max - this.areainfo_n))
        this.areainfo_n++
      }
    }
  }
}
</script>
