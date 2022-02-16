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

const styleId = "streets-v11";
const token =
  "pk.eyJ1IjoiY2VzYXJhdWd1c3Rvb3J0aXoiLCJhIjoiY2t6b3VsOTg4MDB4dzJuazNqcjM3cHloOCJ9.FZN0b_bgzeZd69sHi0q4og";

const url = `https://api.mapbox.com/styles/v1/mapbox/${styleId}/tiles/512/{z}/{x}/{y}@2x?access_token=${token}`;

interface Props {
  lat: number;
  lng: number;
  popupText?: string;
}

const Map = ({ lat, lng, popupText }: Props) => {
  const position: [number, number] = [lat, lng];
  const map = useMap();

  useEffect(() => {
    map.setView(position, 14);
  }, [lat, lng]);

  return (
    <>
      <TileLayer url={url} />
      <Marker position={position}>
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
