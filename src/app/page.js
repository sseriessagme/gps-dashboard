"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";


const Map = dynamic(() => import("../components/Map"), { ssr: false });

export default function Home() {
  const [coords, setCoords] = useState({ busid:0, time:"", lat: 0, lon: 0, status:"" });

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
      <Map  busid={coords.busid} time={coords.time} lon={coords.lon}  lat={coords.lat} status={coords.status} />
  );
}
