import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

function App() {
  return (
    <div className="w-screen h-screen p-12">
      <MapContainer center={[0, 0]} zoom={4} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}

export default App;
