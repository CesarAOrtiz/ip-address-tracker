import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useReducer } from "react";
import reducer from "../reducers/IpInfo";

const defaultIpInfoState = { ip: "", loading: false, error: "" };

function MyApp({ Component, pageProps }: AppProps) {
    const [state, dispatch] = useReducer(reducer, defaultIpInfoState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "WRITE", payload: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            dispatch({ type: "LOADING" });
            const response = await fetch(
                `https://ipwhois.app/json/${state.ip}`
            );
            const data = await response.json();
            dispatch({ type: "SUCCESS", payload: data });
        } catch (error: any) {
            console.log(error);
            dispatch({ type: "ERROR", payload: error.message });
        } finally {
            console.log(state);
        }
    };

    return (
        <Component {...{ state, handleSubmit, handleChange, ...pageProps }} />
    );
}

export default MyApp;
