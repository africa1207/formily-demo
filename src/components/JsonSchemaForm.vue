<template>
  <vue-form
      v-model="formData"
      :schema="schema"
      :ui-schema="uiSchema"
      :formFooter="{show:false}"
      ref="VueFormRef"
  >
    <template #default="{ formData, formRefFn }">
      <div>
        <pre style="background-color: #eee;">{{ JSON.stringify(formData.value, null, 4) }}</pre>
        <p><el-button @click="consoleLog(formRefFn)" type="primary">slot-scope点击</el-button></p>
      </div>
    </template>
  </vue-form>
  <el-button type="danger" @click="submitForm">外部按钮click</el-button>
</template>

<script>
import {defineComponent} from "vue";

import ProductSelectWidget from '@/components/ProductSelectWidget';
import ProvinceCityWidget from '@/components/ProvinceCityWidget';
import $DateTimePickerWidget from '@/components/$DateTimePickerWidget'
import CustomDatePicker from '@/components/CustomDatePicker'
export default defineComponent({
  name: 'JsonSchemaForm',
  mounted() {
    this.formData.product = 3
    this.formData.selectWidget = ["130000","130100","130104"]
    this.formData.datePicker = new Date('2022-07-26').getTime()
  },
  methods:{
    async submitForm() {
      await this.$refs.VueFormRef.$$uiFormRef.validate()
      console.log(this.$refs.VueFormRef.modelValue)
    },
    consoleLog(getForm) {
      // getForm() 会获取到el-form的ref实例
      getForm().validate()
    }
  },
  data() {
    return {
      formData: {},
      schema: {
        "title": "Object property dependencies",
        "type": "object",
        "required": [
          "product",
            "age"
        ],
        "properties": {
          "product": {
            "title": "product",
            "type": 'number',
          },
          age: {
            title: "age",
            type: 'number'
          },
          time: {
            title: "time",
            type: 'array',
            items: {
              type: 'string'
            }
          },
          selectWidget: {
            title: 'selectWidget',
            type:'array',
            items:{
              type: 'string'
            }
          },
          datePicker: {
            title: 'custom-date-picker',
            type: 'number',
            default: new Date().getTime()
          },
        }
      },
      uiSchema: {
        product: {
          'ui:widget': ProductSelectWidget,
          'ui:options': {
            attrs: {
              dict: 'product_dict',
              size: 'small'
            }
          }
        },
        age: {
          'ui:widget': 'el-input-number',
          'ui:options': {
            min: 1
          }
        },
        time: {
          'ui:widget': $DateTimePickerWidget,
          'ui:options': {

          }
        },
        selectWidget: {
          'ui:widget': ProvinceCityWidget,
          'ui:options': {

          }
        },
        datePicker: {
          'ui:widget': CustomDatePicker,
          'ui:options': {

          }
        },
      },
      errorSchema: {},
    }
  },
})
</script>

<style scoped>

</style>
