<template>
  <el-date-picker
      v-model="modelValue"
      type="datetimerange"
      placeholder="Pick a Date"
      format="YYYY/MM/DD hh:mm:ss"
      value-format="YYYY-MM-DD h:m:s a"
      @change="changeValue"
  />
</template>

<script lang="ts" setup>
import {defineEmits} from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:modelValue'])
function changeValue(val: any) {
  emits('update:modelValue', val)
}

</script>

<style scoped>

</style>
