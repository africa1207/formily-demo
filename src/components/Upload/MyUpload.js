import { h, ref, getCurrentInstance,defineComponent } from 'vue';
import { resolveComponent } from '@lljj/vjsf-utils/vue3Utils';
import { openNewPage } from '@lljj/vjsf-utils/utils';


// mock
// https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca
/**
 * props: responseFile 上传接口成功后返回的response必须包含图片id和url{id:"",url:""}，定义的函数调用必须返回{name:"",url:"",id:""}
 * 调用方式如下
 * "ui:responseFile" : res => {
 *     return {
 *         name: "xx",
 *         id: res.data.id,
 *         url: res.data.url
 *     }
 * }
 */

export default defineComponent( {
    name: 'UploadWidget',
    props: {
        modelValue: {
            default: null,
            type: [Object, Array]
        },
        responseFile: {
            default: () => res => (res ? {name:res.data?.name||parseInt(String(Math.random()*100000000000000)), id: res.data?.id, url: res.data?.url} : {}),
            type: [Function]
        },
        btnText: {
            type: String,
            default: '点击上传'
        },
        // 传入 VNode
        slots: {
            type: null,
            default: null
        }
    },
    setup(props, { attrs, emit }) {
        // 设置默认 fileList
        const curModelValue = props.modelValue;
        const isArrayValue = Array.isArray(curModelValue);

        const defaultFileList = attrs.fileList || (() => {
            if (isArrayValue) {
                return curModelValue.map((item, index) => ({
                    name: curModelValue.name || `已上传文件（${index + 1}）`,
                    url: item.url,
                    id: item.id
                }));
            }
            if (curModelValue) {
                return [{
                    name: curModelValue.name || '已上传文件',
                    url: curModelValue.url,
                    id: curModelValue.id
                }];
            }
            return [];
        })();

        // fileList
        const fileListRef = ref(defaultFileList);

        const getFileItem = fileItem => {
            return (
                    fileItem
                    &&
                    ( // 有response表示上传成功的 没有则表示默认fileList或者modelValue传入的
                        (fileItem.response
                            ? (props.responseFile && props.responseFile(fileItem.response))
                            : {url:fileItem.url,name:fileItem.name,id:fileItem.id} )
                    )
                )
                || {}
        };

        const emitValue = (emitFileList) => {
            // v-model
            let curValue;

            if (isArrayValue) {
                curValue = emitFileList.length ? emitFileList.reduce((pre, item) => {
                    const fileItem = getFileItem(item);
                    if (fileItem) pre.push(fileItem);
                    return pre;
                }, []) : [];
            } else {
                const fileItem = emitFileList[emitFileList.length - 1];
                curValue = getFileItem(fileItem);
            }

            emit('update:modelValue', curValue);
        };

        const globalProperties = getCurrentInstance().appContext.config.globalProperties;

        return () => {
            const data = {
                fileList: fileListRef.value,
                'on-exceed': () => {
                    if (globalProperties.$message) {
                        globalProperties.$message.warning('超出文件上传数');
                    }
                },
                'on-error': () => {
                    if (globalProperties.$message) {
                        globalProperties.$message.error('文件上传失败');
                    }
                },
                'on-preview': (file) => {
                    const fileItem = getFileItem(file);
                    if (fileItem?.url) openNewPage(fileItem.url);
                },
                ...attrs,
                'on-remove': (file, fileList) => {
                    // TODO 自动上传后移除还需要到服务器删除对应图片 此处需要判断下是上传成功后的file还是回显的file，可以根据是否有response字段来判断
                    emitValue(fileList);

                    if (attrs['on-remove']) {
                        attrs['on-remove'](file, fileList);
                    }
                },
                'on-success': (response, file, fileList) => {
                    emitValue(fileList);
                    // 用户注册的 onSuccess
                    if (attrs['on-success']) {
                        attrs['on-success'](response, file, fileList);
                    }
                }
            };

            if (!isArrayValue) data.limit = 1;

            const childVNode = {
                default: () => h(
                    resolveComponent('el-button'),
                    {
                        type: 'primary'
                    },
                    {
                        default: () => props.btnText
                    }
                ),
                ...(props.slots || {}),
            };

            return h(resolveComponent('el-upload'), data, childVNode);
        };
    }
});
