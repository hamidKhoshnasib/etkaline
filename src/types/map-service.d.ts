interface MapClickEvent {
  coordinate: [number, number];
}

interface MapViewFeature {
  geom: {
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  properties: Record<string, unknown>;
}

interface EtkalaVectorSource {
  clear(): void;
}

interface EtkalaVectorLayer {
  getSource(): EtkalaVectorSource;
}

interface EtkalaMapView {
  getCenter(): [number, number];
  setCenter(center: [number, number]): void;
  setZoom(zoom: number): void;
}

interface EtkalaMap {
  getView(): EtkalaMapView;
  on(event: "click", handler: (event: MapClickEvent) => void): void;
  on(event: "moveend", handler: () => void): void;
  setTarget(target?: string | HTMLElement): void;
  un(event: "click", handler: (event: MapClickEvent) => void): void;
  un(event: "moveend", handler: () => void): void;
}

interface MapServiceOptions {
  center: [number, number];
  editable: boolean;
  geoserver: string;
  layername: string[];
  map: string;
  searchServer: string;
  viewJson: unknown[];
  zoom: number;
}

declare class MapService {
  constructor(options: MapServiceOptions);

  ol2d: EtkalaMap;
  vectorView: EtkalaVectorLayer;
  addFeatures(features: MapViewFeature[], layer: EtkalaVectorLayer): void;
}

interface Window {
  MapService?: typeof MapService;
  mapServiceReady?: Promise<typeof MapService>;
}
