import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useReducer, useEffect } from "react";
import reducer from "../reducers/IpInfo";

const defaultIpInfoState = { ip: "", loading: false, error: "" };

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, defaultIpInfoState);

  const getIpInfo = async () => {
    try {
      dispatch({ type: "LOADING" });
      const response = await fetch(`https://ipwhois.app/json/${state.ip}`);
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "WRITE", payload: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await getIpInfo();
  };

  useEffect(() => {
    getIpInfo();
  }, []);

  useEffect(() => {
    if (state.ipInfo && !state.ip) {
      dispatch({ type: "WRITE", payload: state.ipInfo.ip });
    }
  }, [state.ipInfo]);

  return <Component {...{ state, handleSubmit, handleChange, ...pageProps }} />;
}

export default MyApp;
