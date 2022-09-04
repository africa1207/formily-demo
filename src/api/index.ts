import request from "@/utils/http";
import { BannerModel } from "@/@types/model";

export const getBanner = () => {
  return request.get<BannerModel>("/banner", { type: 2 });
};

export const delAttach = (fileId: string) => {
  return request.delete(`file-attach/${fileId}`)
}
