import { FunctionComponent } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    MapConsumer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const styleId = "streets-v11";
const token =
    "pk.eyJ1IjoiY2VzYXJhdWd1c3Rvb3J0aXoiLCJhIjoiY2t6b3VsOTg4MDB4dzJuazNqcjM3cHloOCJ9.FZN0b_bgzeZd69sHi0q4og";

const url = `https://api.mapbox.com/styles/v1/mapbox/${styleId}/tiles/512/{z}/{x}/{y}@2x?access_token=${token}`;
// const attribution =
//     'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>';

interface Props {
    lat: number;
    lng: number;
    popupText?: string;
}

const Map: FunctionComponent<Props> = ({ popupText, lat, lng }) => {
    const position: [number, number] = [lat, lng];
    return (
        <MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <MapConsumer>
                {(map) => (
                    <>
                        {console.log(map.getCenter())}
                        <TileLayer url={url} />
                        <Marker position={map.getCenter()}>
                            <Popup>{popupText}</Popup>
                        </Marker>
                    </>
                )}
            </MapConsumer>
        </MapContainer>
    );
};

export default Map;
