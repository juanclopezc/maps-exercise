export interface PolygonCompleted extends google.maps.Polygon {
    id?: string;
    name?: string;
    labels?: google.maps.Marker[];
}