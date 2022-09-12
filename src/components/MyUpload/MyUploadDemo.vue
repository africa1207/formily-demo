<template>
  <div>
    <vue-form
        v-model="formData"
        :schema="schema"
        :ui-schema="uiSchema"
        @submit="submit"
        @cancel="cancel"
        ref="VueFormRef"
    />
  </div>
</template>

<script lang="tsx" setup name="MyUploadDemo">
import {onMounted, ref} from "vue";
import MyUpload from './MyUpload';
import useUploadResult from "./useUploadResult";


type PicType = {name:string,id:string|number,url: string}

const {handleUploadResult} = useUploadResult()

const submit = (formData: any) => {
  console.log(handleUploadResult(formData.value.idCard))

}
const cancel = () => {
  VueFormRef.value!.$$uiFormRef.resetFields()
}
onMounted(() => {
  setTimeout(() => {
    formData.value.idCard = [{name:'21212121',url:'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',id:93783901}]
  },1000)
})

const VueFormRef = ref<any>(null)
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
const tip = () => (<p style="width:200px">请上传图片</p>)
const uiSchema = ref({
  idCard: {
    'ui:widget': MyUpload,
    'ui:options': {
      slot_tip: tip,
      slot_default: () => <el-button>点击上传</el-button>,
      beforeRemove: (file,fileList) => {

      },
      attrs: {
        'list-type': 'text',
        limit: 2,
        name:"file",
        headers: {token:"headers_test_token"},
        'action': 'http://localhost:8008/upload',
        // fileList: [{name:'one',url:'http://img.alicdn.com/tfs/TB1vYlkdnZmx1VjSZFGXXax2XXa-468-644.jpg_320x5000q100.jpg_.webp',id:93783901}]
      }
    }
  }
})
</script>
