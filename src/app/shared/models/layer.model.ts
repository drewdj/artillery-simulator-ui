export type LayerType = 'base' | 'overlay' | 'vector' | 'heatmap';

export interface MapLayer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  opacity: number;
  icon: string;
}

export const MOCK_LAYERS: MapLayer[] = [
  { id: 'osm', name: 'OpenStreetMap', type: 'base', visible: true, opacity: 1, icon: 'map' },
  { id: 'terrain', name: 'Terreno', type: 'overlay', visible: false, opacity: 0.8, icon: 'landscape' },
  { id: 'elevation', name: 'Elevación', type: 'overlay', visible: false, opacity: 0.6, icon: 'terrain' },
  { id: 'entities', name: 'Entidades', type: 'vector', visible: true, opacity: 1, icon: 'place' },
  { id: 'fire-zones', name: 'Zonas de fuego', type: 'vector', visible: true, opacity: 0.7, icon: 'local_fire_department' },
  { id: 'grid', name: 'Cuadrícula MGRS', type: 'overlay', visible: false, opacity: 0.5, icon: 'grid_on' },
];
