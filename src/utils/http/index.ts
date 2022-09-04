import client from "@/utils/http/http";
import qs from "qs";
import { RequestResponse } from "umi-request";

type RequestType = {
  get: <T>(url: string, data?: any) => Promise<RequestResponse<T>>;
  delete: <T>(url: string, data?: any) => Promise<RequestResponse<T>>;
  postJson: <T>(url: string, data?: any) => Promise<RequestResponse<T>>;
  postForm: <T>(url: string, data?: any) => Promise<RequestResponse<T>>;
  upload?: (
    url: string,
    formData: FormData,
    handleReqProcess?: (e: ProgressEvent) => void
  ) => Promise<any>;
  setHeader: (headers: any) => void;
};
const request: RequestType = {
  get(url, data) {
    return client.get(url, { params: data, getResponse: true });
  },
  delete(url, data) {
    return client.delete(url, { params: data, getResponse: true });
  },
  postJson(url, data) {
    return client.post(url, {
      data,
      getResponse: true,
      headers: {
        "Content-Type": "application/json; chartset=utf-8"
      }
    });
  },
  postForm(url, data) {
    return client.post(url, {
      data: qs.stringify(data, { arrayFormat: "brackets" }),
      getResponse: true,
      headers: {
        "Content-Type": "x-www-form-urlencoded"
      }
    });
  },
  upload(url, formData, handleReqProcess) {
    return client(url, {
      method: "post",
      requestType: "form",
      data: formData,
      onReqProgress: handleReqProcess
    });
  },
  setHeader(headers = {}) {
    client.extendOptions({ headers: { ...headers } });
  }
};

export default request;
