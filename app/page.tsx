"use client";

import { useState, useEffect } from "react";
import Map from "@/components/Map";
import LeftSidebar from "@/components/LeftSidebar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [places, setPlaces] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  useEffect(() => {
    fetch("/api/places")
      .then(r => r.json())
      .then(setPlaces);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <LeftSidebar
        places={places}
        selectedPlace={selectedPlace}
        onSelectPlace={setSelectedPlace}
      />

      <div style={{ flex: 1 }}>
        <Map places={places} onSelectPlace={setSelectedPlace} />
      </div>

      {selectedPlace && (
        <Sidebar
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}
