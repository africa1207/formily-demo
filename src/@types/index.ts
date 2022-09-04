export interface ResponseModel {
  code: number;
  [p: string]: any;
}

export interface DemoListItem {
  user_id: string;
  user_name: string;
  got_digg_count: number;
  got_view_count: number;
  avatar_large: string;
  company: string;
  job_title: string;
  level: number;
  description: string;
  author_desc: string;
  isfollowed: boolean;
}

export interface DemoResponse {
  err_no: number;
  err_msg: string;
  data: DemoListItem[];
  cursor: string;
  count: number;
  has_more: boolean;
}
