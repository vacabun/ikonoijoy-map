"use client";

import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "@/lib/googleMaps";
import { mapController } from "@/lib/mapSingleton";

export default function Map({ places, onSelectPlace }: any) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!places?.length) return;

    async function init() {
      const { Map, AdvancedMarkerElement } = await loadGoogleMaps();
      mapController.init(ref.current!, Map, "6e660276072b38b4d9f93c4b");
      places.forEach((p: any) =>
        mapController.addPlace(p, AdvancedMarkerElement, onSelectPlace)
      );
    }

    init();
  }, [places]);

  return <div ref={ref} style={{ height: "100%" }} />;
}
