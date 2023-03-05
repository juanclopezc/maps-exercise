export interface PolygonCompleted extends google.maps.Polygon {
    id?: string;
    name?: string;
    selected?: boolean;
    labels?: google.maps.Marker[];
}