
export default function useUploadResult(
    responseFile = res => (res ? {
    name: res.data?.name || parseInt(String(Math.random() * 100000000000000)),
    id: res.data?.id,
    url: res.data?.url
} : {})) {
    const getFileItem = fileItem => {
        return (
                fileItem
                &&
                ( // 有response表示上传成功的 没有则表示默认fileList或者modelValue传入的
                    (fileItem.response
                        ? (responseFile && responseFile?.(fileItem.response))
                        : {url: fileItem.url, name: fileItem.name, id: fileItem.id})
                )
            )
            || {}
    };
    const handleUploadResult = (fileList) => {
        return  fileList.length ? fileList.reduce((pre, item) => {
            const fileItem = getFileItem(item);
            if (fileItem) pre.push(fileItem);
            return pre;
        }, []) : [];
    };
    return {
        getFileItem, handleUploadResult
    }
}
