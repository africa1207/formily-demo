<template>
  <vue-form
      v-if="dataBack"
      v-model="formData"
      :schema="schema"
      :ui-schema="uiSchema"
      @submit="submit"
      @cancel="cancel"
      ref="VueFormRef"
  />
</template>

<script lang="ts" setup name="UploadDemo">
/**
 * 此版本有问题，清空重置后还会显示，可以使用MyUpload案例
 */
import {onMounted, ref, h, resolveComponent} from "vue";
// @ts-ignore
import MyUpload from './Upload.js';


type PicType = {name:string,id:string|number,url: string}

const submit = (formData: any) => {
  console.log(formData)
}
const cancel = () => {
  VueFormRef.value!.$$uiFormRef.resetFields()
}
onMounted(() => {
  setTimeout(() => {
    formData.value.idCard = [{name:'21212121',url:'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',id:93783901}]
    dataBack.value=true
  },1000)
})

// dataBack字段用来控制Upload组件图片回显的问题，由于formData.value.idCard 对于MyUpload来说属于ModelValue，源码中setup的时候值为0所以fileList也是0，所以用dataBack控制等拿到数据以后再初始化vue-form就有值了
// 也可以不用dataBack字段，直接设置uiSchema的ui:fileList，但是还需要再设置formData.value.idCard的值
/**
 *      (uiSchema.value.idCard as any)["ui:fileList"] = [{name:'21212121',url:'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',id:93783901}]
 *     formData.value.idCard = [{name:'21212121',url:'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',id:93783901}]
 */
const VueFormRef = ref<any>(null)
const dataBack = ref(false)
const formData = ref<{idCard:PicType[]}>({idCard:[]})
const schema = ref({
  type: 'object',
  required: ["name","idCard"],
  properties: {
    name: {
      title: "用户名",
      type: "string",
    },
    idCard: {
      title: '身份证',
      type: 'array',
      items: {
        type: 'object'
      }
    }
  }
})
const uiSchema = ref({
  idCard: {
    'ui:widget': MyUpload,
    'ui:options': {
      slots: h(resolveComponent("el-tag"), { type: "primary" }, "abc"),
      attrs: {
        'list-type': 'picture-card',
        limit: 3,
        name:"files",
        headers: {token:"headers_test_token"},
        'action': 'http://localhost:8008/upload',
        // fileList: [{name:'one',url:'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',id:93783901}]
      }
    }
  }
})
</script>
