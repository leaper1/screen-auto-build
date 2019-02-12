<template>
  <div class="drawbar">
    <div class="maxbar"></div>
    <div class="minbar" :style="{width:precent}"></div>
  </div>
</template>

<script>
export default {
  props: {
    precent: {
      type: String,
      default: '0%'
    }
  }
}
</script>

<style lang="scss" scoped>
.drawbar {
  position: relative;
  width: 100%;
  height: 20px;
  cursor: pointer;
  .maxbar {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 20px;
    border-radius: 10px;
    background: #a4a7cb;
    position: relative;
  }
  .minbar {
    position: absolute;
    left: 0;
    top: 0;
    width: auto;
    height: 20px;
    border-radius: 10px;
    background: #ed828e;
    z-index: 1;
  }
  .maxbar:hover {
    background-color: #b4b7df;
  }
  .minbar:hover  {
    background-color: #ff8f9c;
  }
}
</style>
