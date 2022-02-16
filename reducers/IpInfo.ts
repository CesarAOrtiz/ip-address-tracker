import { IpInfoActions } from "../actions/IpInfoActions";
import { IpInfoState } from "../interfaces/IpInfoState";

const reducer = (state: IpInfoState, action: IpInfoActions) => {
    switch (action.type) {
        case "WRITE":
            return { ...state, ip: action.payload };
        case "LOADING":
            return { ...state, loading: true };
        case "SUCCESS":
            return { ...state, ipInfo: action.payload, loading: false };
        case "ERROR":
            return { ...state, error: action.payload, loading: false };
        default:
            throw new Error("Unexpected action");
    }
};

export default reducer;
