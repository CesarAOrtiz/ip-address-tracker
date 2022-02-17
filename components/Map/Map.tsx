import { FunctionComponent, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    MapContainerProps,
    ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface Props {
    tilelayerUrl: string;
    lat: number;
    lng: number;
    popupText?: string;
}

const Map: FunctionComponent<Props> = ({
    lat,
    lng,
    popupText,
    tilelayerUrl,
}) => {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lng], 14);
    }, [lat, lng, map]);

    return (
        <>
            <TileLayer url={tilelayerUrl} />
            <Marker position={[lat, lng]}>
                <Popup>
                    <p className="font-bold text-lg">{popupText}</p>
                </Popup>
            </Marker>
            <ZoomControl position="bottomleft" />
        </>
    );
};

const MapWrapper: FunctionComponent<Props & MapContainerProps> = (props) => {
    return (
        <MapContainer
            zoom={14}
            scrollWheelZoom={true}
            className="h-full w-full"
            zoomControl={false}
        >
            <Map {...props} />
        </MapContainer>
    );
};

export default MapWrapper;
