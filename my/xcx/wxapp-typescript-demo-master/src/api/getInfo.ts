import { API } from "../config/cgi-config";
import { ICommonResp, IRequestOption } from "./common";
import { request } from "../utils/request/index";

export interface IGetInfoReq {
  id: string; //ID
}

// 信息
export interface IMyInfo {
  name: string; // 名字
  phone: string; // 电话
  email: string; // 邮件
}

export interface IGetInfoResp {
  info: IMyInfo;
}

export default async function getInfo(
  req: IGetInfoReq,
  options?: IRequestOption
) {
  const resp: ICommonResp<IGetInfoResp> = await request(
    API.getInfo,
    req,
    options
  );
  return resp.data;
}
