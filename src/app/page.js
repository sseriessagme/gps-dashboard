"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";


const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [coords, setCoords] = useState({ lat: 0, lon: 0, status:"" });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://192.168.1.5:8000/latest"); 
        const data = await res.json();
        if (data.lat && data.lon && data.status) setCoords(data);
      } catch (e) {
        console.log("Error fetching GPS:", e);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>GPS Coordinates</h1>
      <p>Latitude: {coords.lat}</p>
      <p>Longitude: {coords.lon}</p>
      <p>Status: {coords.status}</p>

      <div style={{ width: "80%", height: "400px", margin: "0 auto" }}>
        <Map lat={coords.lat} lon={coords.lon} />
      </div>
    </div>
  );
}
