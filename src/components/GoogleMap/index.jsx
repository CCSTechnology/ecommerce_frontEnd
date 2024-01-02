import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Icon from "../../assets/icons/location-icon.jpg";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import the Leaflet components using dynamic import

const GoogleMap = (props) => {
  const ZOOM_LEVEL = 14;
  const mapRef = useRef();

  const position = [8.721499525470726, 77.773508746398362];
  // const position=[latitude,longitude]

  // const BoatIcon = L.icon({
  //     iconSize: [40, 40],
  //     iconAnchor: [12, 12],
  //     popupAnchor: [0, 0],
  //     popupAnchor: "/assets/icons/pin.png"
  // });
  const leafletIcon = new L.Icon({
    iconUrl: Icon,
    iconSize: [40, 40],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  });
  //   useEffect(() => {
  //     setMapData(latitude);
  //     setLongData(longitude);
  //   }, [latitude, longitude]);

  //   useEffect(() => {
  //     const apiKey = "AIzaSyBpPnB6Le56oWSrap61sQsrZY3HRtr_cQU"; // Replace with your actual API key

  //     const request = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  //     axios
  //       .get(request)
  //       .then((response) => {
  //         if (response.data.status === "OK" && response.data.results.length > 0) {
  //           const formattedAddress = response.data.results[0].formatted_address;
  //           setAddress(formattedAddress);
  //         } else {
  //           setAddress("Address not found");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching address:", error);
  //         setAddress("Error fetching address");
  //       });
  //   }, [latitude, longitude]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <MapContainer
            center={position}
            zoom={ZOOM_LEVEL}
            maxZoom={18}
            ref={mapRef}
            scrollWheelZoom={false}
            style={{
              height: "600px",
              width: "100%",
            }}
          >
            {/* <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            <TileLayer
              attribution="Google Maps"
              url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <Marker position={position} icon={leafletIcon}>
              <Popup>
                plot no 17,Balan Avenue, KTC Nagar
                <br />
                Tirunelveli , TamilNadu-627011 India
                <br />
                {/* Chennai, Tamil Nadu 600032, IN */}
              </Popup>
            </Marker>
          </MapContainer>
        </Grid>
      </Grid>
    </Box>
  );
};
export default GoogleMap;
// Import necessary libraries and components...

// const GoogleMap = (props) => {
//   const { latitude, longitude } = props;
//   const ZOOM_LEVEL = 9;
//   const mapRef = useRef();
//   const [address, setAddress] = useState(null);

//   const position = [latitude || 0, longitude || 0];

//   const leafletIcon = new L.Icon({
//     iconUrl: "/dummy/location-icon.jpg", // Replace with the path to your custom marker icon
//     iconSize: [40, 40],
//     iconAnchor: [20, 40], // Adjust the anchor to center the icon on the marker
//     popupAnchor: [0, -40], // Adjust the popup anchor to display above the marker
//   });

//   useEffect(() => {
//     const apiKey = "AIzaSyBpPnB6Le56oWSrap61sQsrZY3HRtr_cQU"; // Replace with your actual API key

//     const request = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

//     axios
//       .get(request)
//       .then((response) => {
//         if (response.data.status === "OK" && response.data.results.length > 0) {
//           const formattedAddress = response.data.results[0].formatted_address;
//           setAddress(formattedAddress);
//         } else {
//           setAddress("Address not found");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching address:", error);
//         setAddress("Error fetching address");
//       });
//   }, [latitude, longitude]);

//   return (
//     <Box>
//       <Grid container>
//         <Grid item xs={12}>
//           <MapContainer
//             center={position}
//             zoom={ZOOM_LEVEL}
//             maxZoom={18}
//             ref={mapRef}
//             scrollWheelZoom={false}
//             style={{
//               height: "600px",
//               width: "100%",
//             }}
//             className="map-container-small"
//           >
//             <TileLayer
//               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//               url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={position} icon={leafletIcon}>
//               <Popup>{address}</Popup>
//             </Marker>
//           </MapContainer>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default GoogleMap;
