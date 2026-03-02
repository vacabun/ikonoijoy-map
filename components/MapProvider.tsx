"use client";

import { createContext, useContext } from "react";

const MapContext = createContext(null);

export function MapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MapContext.Provider value={null}>
      {children}
    </MapContext.Provider>
  );
}

export const useMap = () =>
  useContext(MapContext);