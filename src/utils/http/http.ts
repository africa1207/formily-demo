import request, { extend } from "umi-request";
import progressMiddleware from "umi-request-progress";
import { ElNotification } from 'element-plus';
import errorHandler from "@/utils/http/errorHandler";
import { ResponseModel } from "@/@types/index";

// 注册内核中间件
request.use(progressMiddleware, { core: true });

/**
 * 配置request请求时的默认参数
 */
const client = extend({
  errorHandler, // 默认错误处理
  prefix: "http://endure.sh1.k9s.run:2271/",
  timeout: 150000
});
// request拦截器, 改变url 或 options
client.interceptors.request.use(
  (url, options) => {
    return {
      url,
      options: { ...options }
    };
  },
  { global: true }
);

const key = "updatable";
// 克隆响应对象做解析处理
client.interceptors.response.use(async (response) => {
  try {
    const data: ResponseModel = await response.clone().json();

    if (data && (data.code === 4003 || data.code === 4002)) {
      ElNotification({
        title: `提示`,
        message: "登录已过期，请重新登录",
        type: 'error',
      })
      return response;
    }
  } catch (error) {}
  return response;
});

export default client;
