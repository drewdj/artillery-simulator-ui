export type EntityStatus = 'active' | 'inactive' | 'destroyed' | 'unknown';
export type EntityType = 'mortar' | 'artillery' | 'vehicle' | 'infantry' | 'command' | 'supply';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  status: EntityStatus;
  position: [number, number]; // [lon, lat]
  unit?: string;
  bearing?: number;
}

export interface EntityTreeNode {
  id: string;
  name: string;
  type: string;
  icon: string;
  children?: EntityTreeNode[];
}

export const MOCK_ENTITIES: Entity[] = [
  { id: 'e1', name: 'Mortero M-1', type: 'mortar', status: 'active', position: [-3.703, 40.416], unit: 'Cía A' },
  { id: 'e2', name: 'Mortero M-2', type: 'mortar', status: 'active', position: [-3.720, 40.420], unit: 'Cía A' },
  { id: 'e3', name: 'Obús H-1', type: 'artillery', status: 'inactive', position: [-3.680, 40.410], unit: 'Cía B' },
  { id: 'e4', name: 'VCI Alfa', type: 'vehicle', status: 'active', position: [-3.715, 40.405], unit: 'Cía A' },
  { id: 'e5', name: 'PC Batallón', type: 'command', status: 'active', position: [-3.700, 40.430], unit: 'BN' },
];

export const MOCK_TREE: EntityTreeNode[] = [
  {
    id: 'bn1',
    name: 'Batallón Alpha',
    type: 'battalion',
    icon: 'military_tech',
    children: [
      {
        id: 'cia-a',
        name: 'Compañía A',
        type: 'company',
        icon: 'groups',
        children: [
          { id: 'e1', name: 'Mortero M-1', type: 'mortar', icon: 'gps_fixed' },
          { id: 'e2', name: 'Mortero M-2', type: 'mortar', icon: 'gps_fixed' },
          { id: 'e4', name: 'VCI Alfa', type: 'vehicle', icon: 'directions_car' },
        ],
      },
      {
        id: 'cia-b',
        name: 'Compañía B',
        type: 'company',
        icon: 'groups',
        children: [
          { id: 'e3', name: 'Obús H-1', type: 'artillery', icon: 'gps_fixed' },
        ],
      },
      {
        id: 'pc-bn',
        name: 'PC Batallón',
        type: 'command',
        icon: 'account_balance',
        children: [
          { id: 'e5', name: 'PC Batallón', type: 'command', icon: 'account_balance' },
        ],
      },
    ],
  },
];
