export class MapController {

  map: google.maps.Map | null = null;
  markers = new Map<string, any>();

  // using arrow functions ensures `this` is always the controller instance
  init = (
    el: HTMLElement,
    MapClass: typeof google.maps.Map,
    mapId: string
  ) => {
    if (this.map) return;

    this.map = new MapClass(el, {
      center: { lat: 35.6812, lng: 139.7671 },
      zoom: 12,
      mapId,
      mapTypeControl: false,
    });
  };

  addPlace = (
    place: any,
    MarkerClass: any,
    onClick: (p:any)=>void
  ) => {
    if (!this.map) {
      console.warn("MapController.addPlace called before map initialized");
      return;
    }
    if (!MarkerClass) {
      console.warn("addPlace called with undefined MarkerClass", place);
      return;
    }

    const el = document.createElement("div");
    el.style.cssText = "cursor:pointer;";
    el.innerHTML = `
      <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 0C8.059 0 0 8.059 0 18c0 13.5 18 28 18 28S36 31.5 36 18C36 8.059 27.941 0 18 0z" fill="#e94560"/>
        <circle cx="18" cy="18" r="7" fill="white"/>
      </svg>
    `;

    el.onclick = () =>
      onClick(place);

    const marker = new MarkerClass({
      map: this.map,
      position: place.position,
      content: el,
    });

    this.markers.set(place.id, marker);
  };

  panTo = (position:any) => {
    this.map?.panTo(position);
  };

  clearMarkers = () => {
    this.markers.forEach(marker => {
        marker.setMap(null);
    });

    this.markers.clear();
  };
}