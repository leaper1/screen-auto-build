<template>
  <p class="edit-div"
    v-html="innerText"
    :contenteditable="true"
    @focus="isLocked = true"
    @blur="isLocked = false"
    @input="changeText">
  </p>
</template>

<script>
export default {
  name: 'TxtEdit',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      innerText: this.value,
      isLocked: false
    }
  },
  watch: {
    'value' () {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value
      }
    }
  },
  methods: {
    changeText () {
      this.$emit('input', this.$el.innerHTML)
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-div {
  width: 100%;
  height: 100%;
  overflow: hidden;
  word-break: break-all;
  outline: none;
  user-select: text;
  white-space: pre-wrap;
  text-align: left;
  z-index: 100;
  outline: 1px dashed #ddd;
  box-sizing: border-box;
  // text-align: center;
  &[contenteditable=true]{
    // user-modify: read-write-plaintext-only;
    -webkit-user-modify: read-write-plaintext-only;
    &:empty:before {
      content: attr(placeholder);
      display: block;
      color: #ccc;
    }
  }
}
</style>
