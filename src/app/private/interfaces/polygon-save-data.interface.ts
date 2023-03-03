export interface PolygonSaveData {
    id: string;
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    }[]
}