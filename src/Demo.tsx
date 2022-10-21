import { createForm } from "@formily/core";
import { Input, FormItem } from "@formily/element-plus";
import { FormProvider, createSchemaField, ISchema } from "@formily/vue";
import { onMounted, defineComponent, ref } from "vue";
import { observer } from "@formily/reactive-vue";

export default observer(
  defineComponent({
    setup() {
      const form = createForm();
      const { SchemaField } = createSchemaField({
        components: {
          FormItem,
          Input,
        },
      });
      const currentType = ref("type_1");
      const DYNAMIC_INJECT_SCHEMA = ref({
        type_1: {
          type: "void",
          properties: {
            aa: {
              type: "string",
              title: "AA",
              "x-decorator": "FormItem",
              "x-component": "Input",
              "x-component-props": {
                placeholder: "Input",
              },
            },
          },
        },
        type_2: {
          type: "void",
          properties: {
            aa: {
              type: "string",
              title: "AA",
              "x-decorator": "FormItem",
              enum: [
                {
                  label: "111",
                  value: "111",
                },
                { label: "222", value: "222" },
              ],
              "x-component": "Select",
              "x-component-props": {
                placeholder: "Select",
              },
            },
            bb: {
              type: "string",
              title: "BB",
              "x-decorator": "FormItem",
              "x-component": "Input",
            },
          },
        },
      });
      let schema = ref<ISchema>({
        type: "object",
        properties: {
          container: DYNAMIC_INJECT_SCHEMA.value[currentType.value],
        },
      });

      onMounted(() => {
        setTimeout(() => {
          form.clearFormGraph("container.*");
          currentType.value = "type_2";
        }, 2000);
      });

      return () => (
        <FormProvider form={form}>
          <SchemaField schema={schema.value} />
        </FormProvider>
      );
    },
  })
);
