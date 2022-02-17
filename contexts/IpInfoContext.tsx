import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useCallback,
} from "react";
import reducer from "../reducers/IpInfo";
import { IpInfoState } from "../interfaces/IpInfoState";

interface IpInfoContext {
    state: IpInfoState;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const defaultIpInfoContext: IpInfoContext = {
    state: { ip: "", loading: false, error: "" },
    handleSubmit: () => Promise.resolve(),
    handleChange: () => {},
};

const IpInfo = createContext<IpInfoContext>(defaultIpInfoContext);

export function useIpInfo() {
    return useContext(IpInfo);
}

interface Props {
    children: React.ReactNode;
}

const defaultIpInfoState = { ip: "", loading: false, error: "" };

export function IpInfoProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, defaultIpInfoState);

    const getIpInfo = useCallback(async (ip: string = "") => {
        try {
            dispatch({ type: "LOADING" });
            const response = await fetch(`https://ipwhois.app/json/${ip}`);
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }
            dispatch({ type: "SUCCESS", payload: data });
            !ip && dispatch({ type: "WRITE", payload: data.ip });
        } catch (error: any) {
            dispatch({ type: "ERROR", payload: error.message });
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "WRITE", payload: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await getIpInfo(state.ip);
    };

    useEffect(() => {
        getIpInfo();
    }, []);

    useEffect(() => {
        state.error && alert(state.error);
    }, [state.error]);

    return (
        <IpInfo.Provider value={{ state, handleChange, handleSubmit }}>
            {children}
        </IpInfo.Provider>
    );
}
