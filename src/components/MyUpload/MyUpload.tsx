import {defineComponent, getCurrentInstance, PropType, SetupContext} from "vue";
import {Plus} from "@element-plus/icons-vue";
import { openNewPage } from '@lljj/vjsf-utils/utils';
import {UploadFile,UploadFiles} from "element-plus";
import useUploadResult from "./useUploadResult";

export default defineComponent({
    props: {
        modelValue: {
            default: null,
            type: Array
        },
        beforeRemove: {
            type: Function as PropType<(file:UploadFile,fileList: UploadFiles)=>(PromiseRejectedResult|boolean)>,
        }
    },
    setup(props, {attrs, emit}: SetupContext) {
        const globalProperties = getCurrentInstance()!.appContext.config.globalProperties;
        return () => {
            const {
                slot_default,
                slot_tip,
                ...restAttrs
            } = attrs
            const {modelValue, beforeRemove} = props as any
            return (
                <el-upload
                    {...restAttrs}
                    v-model:file-list={modelValue}
                    v-slots={{
                        default: slot_default || <el-icon><Plus/></el-icon>,
                        tip: slot_tip,
                    }}
                    onExceed={() => {
                        if (globalProperties.$message) {
                            globalProperties.$message.warning('超出文件上传数');
                        }
                    }}
                    onError={() => {
                        if (globalProperties.$message) {
                            globalProperties.$message.error('文件上传失败');
                        }
                    }}
                    onSuccess={(response,file,fileList) => {
                        emit('update:modelValue', fileList);
                    }}
                    onRemove={async (file,fileList) => {
                        emit('update:modelValue', fileList);
                    }}
                    beforeRemove={(file,fileList) => {
                        return beforeRemove?.(file,fileList)
                    }}
                    onPreview={(file) => {
                        const {getFileItem} = useUploadResult()
                        const fileItem = getFileItem(file);
                        if (fileItem?.url) openNewPage(fileItem.url);
                    }}
                ></el-upload>
            )
        }
    },
})


