import {
  setOptions,
  importLibrary,
} from "@googlemaps/js-api-loader";

let initialized = false;

export async function loadGoogleMaps() {
  if (!initialized) {
    setOptions({
      key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });
    initialized = true;
  }

  const maps =
    await importLibrary("maps");

  const marker =
    await importLibrary("marker");

  return {
    Map: maps.Map,
    AdvancedMarkerElement:
      marker.AdvancedMarkerElement,
  };
}