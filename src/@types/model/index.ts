export interface Banner {
  pic: string;
  targetId: number;
  adid?: any;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url?: any;
  adurlV2?: any;
  exclusive: boolean;
  monitorImpress?: any;
  monitorClick?: any;
  monitorType?: any;
  monitorImpressList: any[];
  monitorClickList: any[];
  monitorBlackList?: any;
  extMonitor?: any;
  extMonitorInfo?: any;
  adSource?: any;
  adLocation?: any;
  encodeId: string;
  program?: any;
  event?: any;
  video?: any;
  dynamicVideoData?: any;
  song?: any;
  bannerId: string;
  alg: string;
  scm: string;
  requestId: string;
  showAdTag: boolean;
  pid?: any;
  showContext?: any;
  adDispatchJson?: any;
  s_ctrp: string;
}

export interface BannerModel {
  banners: Banner[];
  code: number;
}
