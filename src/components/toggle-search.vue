<template>
  <div class="toggle-search">
    <div class="toggle-search-bd" :class="{'is-active': isopen}" @click="isopen = true">
      <input type="text" ref="search" @keyup.enter="search" v-model="value" class="search_inner" :placeholder="placeholder">
      <span @click="handleSearch" class="search_icon el-icon-search"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      isopen: false
    }
  },
  props: {
    placeholder: String,
    onSearch: Function
  },
  methods: {
    search () {
      this.onSearch(this.value)
    },
    // handCollapse () {
    //   this.
    //   // this.$refs.search.focus()
    //   // this.search()
    // },
    handleSearch () {
      if (this.isopen) {
        this.onSearch(this.value)
      } else {
        this.isopen = true
        this.$refs.search.focus()
      }
    },
    handleBodyClick (e) {
      if (!this.$el.contains(e.target)) this.isopen = false
    }
  },
  created () {
    document.addEventListener('click', this.handleBodyClick)
  },
  destroyed () {
    document.removeEventListener('click', this.handleBodyClick)
  }
}
</script>

<style lang="scss" scoped>
.toggle-search {
  display: inline-block;
  vertical-align: top;
  height: 32px;
  padding: 4px 8px;
  margin: 5px 3px;
  .toggle-search-bd {
    position: relative;
    width: 150px;
    height: 100%;
    -webkit-transition: width 0.4s;
    -moz-transition: width 0.4s;
    transition: width 0.4s;
    .search_inner {
      position: absolute;
      right: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 0 15px;
      height: 100%;
      line-height: 32px;
      // color: #acacd6;
      border-radius: 16px;
      border: 1px solid #909399;
    }
    .search_icon {
      position: absolute;
      cursor: pointer;
      top: 0;
      right: 10px;
      line-height: 32px;
      width: 25px;
      text-align: center;
      font-size: 18px;
    }
    &.is-active {
      width: 250px;
    }
  }

  .input_inner.is-open {
    width: 100%;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #acacd6;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #acacd6;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #acacd6;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #acacd6;
  }
}
</style>
