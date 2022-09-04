import request from "@/utils/http";

import { DemoResponse } from "@/@types";


export const getList = (data: any) => {
  return request.get<DemoResponse>("/author/recommend", data);
};

