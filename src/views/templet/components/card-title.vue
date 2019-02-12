<template>
  <div class="row-item title">
    <span>{{item.name}}</span>
    <i class="el-icon-edit-outline" @click="isEdit = true"></i>
    <template v-if="isEdit">
      <el-input v-model="newTitle"></el-input>
    </template>
  </div>
</template>

<script>
export default {
  name: 'CardTitle',
  data () {
    return {
      isEdit: false
    }
  },
  props: {
    title: String
  },
  methods: {

  }
}
</script>
