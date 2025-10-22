"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [coords, setCoords] = useState({ lat: 0, lon: 0 });

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://192.168.1.6:8000/latest"); // Replace with your FastAPI IP
        const data = await res.json();
        if (data.lat && data.lon) setCoords(data);
      } catch (e) {
        console.log("Error fetching GPS:", e);
      }
    }, 2000); // Fetch every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>GPS Coordinates</h1>
      <p>Latitude: {coords.lat}</p>
      <p>Longitude: {coords.lon}</p>
    </div>
  );
}
