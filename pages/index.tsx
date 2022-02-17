import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import Form from "../components/Form";
import Info from "../components/Info";
import { useIpInfo } from "../contexts/IpInfoContext";

const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false,
});

interface Props {
    mapboxTilelayerUrl: string;
    pageProps: any;
}

const Home: NextPage<Props> = ({ mapboxTilelayerUrl }) => {
    const { state, handleSubmit, handleChange } = useIpInfo();
    return (
        <>
            <Head>
                <title>IP Adress Tracker</title>
                <meta property="og:site_name" content="IP Adress Tracker" />
                <meta
                    property="og:description"
                    content="This is a solution to the IP address tracker challenge on Frontend Mentor. Frontend Mentor challenges help you improve your coding skills by building realistic projects."
                />
                <meta property="og:image" content="screenshot.jpeg" />

                <link rel="icon" href="/favicon.png" />
            </Head>

            <main className="flex flex-col items-center justify-center min-h-screen h-screen container max-w-[1440px] mx-[auto]">
                <div
                    style={{ backgroundImage: "url('/pattern-bg.png')" }}
                    className="flex flex-col items-center w-full h-[200px]"
                >
                    <h1 className="text-white text-2xl font-bold py-4">
                        IP Address Tracker
                    </h1>
                    <Form
                        value={state.ip}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                </div>

                <div className="flex flex-row flex-wrap justify-around py-3 px-3 rounded-lg max-w-[80%] bg-white shadow-lg z-20 absolute top-[120px]">
                    <Info title="ip address" description={state.ipInfo?.ip} />
                    <Info title="location" description={state.ipInfo?.city} />
                    <Info
                        title="timezone"
                        description={state.ipInfo?.timezone_gmt}
                    />
                    <Info title="isp" description={state.ipInfo?.isp} />
                </div>

                <div
                    style={{ height: "calc(100vh - 200px)" }}
                    className="w-full max-h-full z-10"
                >
                    {state.ipInfo && (
                        <MapWithNoSSR
                            lat={state.ipInfo.latitude}
                            lng={state.ipInfo.longitude}
                            popupText={state.ipInfo.ip}
                            tilelayerUrl={mapboxTilelayerUrl}
                        />
                    )}
                </div>
            </main>
        </>
    );
};

export async function getStaticProps() {
    return {
        props: {
            mapboxTilelayerUrl: process.env.MAPBOX_TILELAYER_URL,
        },
    };
}

export default Home;
