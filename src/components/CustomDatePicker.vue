<template>
  <v-date-picker v-model="modelValue" @dayclick="onChange" />
</template>

<script lang="ts" setup name="CustomDatePicker">
import { DatePicker as VDatePicker } from 'v-calendar';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
})
const emits = defineEmits(['update:modelValue'])

function onChange(val: any) {
  emits('update:modelValue',val.date.getTime())
}
</script>

<style scoped>

</style>
