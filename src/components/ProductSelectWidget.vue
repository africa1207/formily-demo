<template>
  <el-select @change="selectChange" v-model="modelValue" placeholder="Select" size="large">
    <el-option
        v-for="item in optLists"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
</template>

<script lang="ts" name="ProductSelectWidget" setup>
import {onMounted, ref} from "vue";
import {ElSelect} from "element-plus";

type ProductListsType = {label:string,value:number}[]

const getDict = () => {
  return new Promise<ProductListsType>((resolve, reject) => {
    setTimeout(() => { resolve([
      {label: '足球', value: 1},
      {label: '篮球', value: 2},
      {label: '网球', value: 3}
    ]) },2000)
  })
}

onMounted(async () => {
  const data = await getDict()
  optLists.value = data
})

const optLists = ref<ProductListsType>([{label: '请选择',value: -1}])
const props = defineProps({
  modelValue: {
    type: Number,
    default: -1
  },
  dict: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['update:modelValue'])

function selectChange(val: any) {
  emits('update:modelValue',val)
}

</script>

<style scoped>

</style>
