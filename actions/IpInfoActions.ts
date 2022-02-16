import { IPInfo } from "../interfaces/IpInfo";

export type IpInfoActions =
    | { type: "WRITE"; payload: string }
    | { type: "LOADING" }
    | { type: "SUCCESS"; payload: IPInfo }
    | { type: "ERROR"; payload: string };
