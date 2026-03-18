import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatDivider } from '@angular/material/divider';
import { MapLayer, MOCK_LAYERS } from '../../../shared/models/layer.model';

@Component({
  selector: 'app-layers-panel',
  standalone: true,
  imports: [MatIcon, MatSlideToggle, MatDivider],
  templateUrl: './layers-panel.component.html',
  styleUrl: './layers-panel.component.scss',
})
export class LayersPanelComponent {
  readonly layers = signal<MapLayer[]>(MOCK_LAYERS.map((l) => ({ ...l })));

  toggleLayer(id: string): void {
    this.layers.update((layers) =>
      layers.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  }

  layerTypeLabel(type: MapLayer['type']): string {
    const map: Record<MapLayer['type'], string> = {
      base: 'Base',
      overlay: 'Superposición',
      vector: 'Vectorial',
      heatmap: 'Mapa de calor',
    };
    return map[type];
  }
}
