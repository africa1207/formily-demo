<template>
  <elui-china-area-dht v-model="modelValue" @change="onChange"></elui-china-area-dht>
</template>

<script lang="ts" name="ProvinceCityWidget" setup>
import EluiChinaAreaDht from 'elui-china-area-dht'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ([])
  },
})
const emits = defineEmits(['update:modelValue'])

function onChange(val: any) {
  emits('update:modelValue',val)
}

</script>

<style scoped>

</style>
