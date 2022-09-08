<template>
  <FormProvider :form="form">
    <ArrayField
        name="upload"
        title="卡片上传"
        :decorator="[FormItem]"
        :component="[
        Upload,
        {
          listType: 'picture-card',
          action:'//localhost:8008/upload',
          name: 'file'
        },
      ]"
        required
    />
    <FormButtonGroup>
      <Submit @submit="handleSubmit">提交</Submit>
      <Reset forceClear>重置</Reset>
    </FormButtonGroup>
  </FormProvider>
</template>

<script lang="ts" setup>
import {createForm} from '@formily/core'
import {FormItem, FormButtonGroup, Submit, Reset, Upload} from '@formily/element-plus'
import {FormProvider, ArrayField, useField} from '@formily/vue'


const form = createForm()
const field = useField()
const handleSubmit = (data) => {
  console.log(data)
}

</script>
