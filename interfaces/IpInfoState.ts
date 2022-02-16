import { IPInfo } from "./IpInfo";

export interface IpInfoState {
    ip: string;
    ipInfo?: IPInfo;
    loading: boolean;
    error: string;
}
