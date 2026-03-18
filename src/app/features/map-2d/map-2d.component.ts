import {
  Component,
  OnDestroy,
  AfterViewInit,
  inject,
  ElementRef,
  viewChild,
  effect,
} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import { MapModeService } from '../../core/services/map-mode.service';

/**
 * Map2DComponent — OpenLayers 2D map wrapper.
 *
 * Renders an OSM base map. Hidden (display:none) when in 3D mode via the parent
 * template, but kept in DOM to preserve state on mode toggle.
 * Calls map.updateSize() when switching back to 2D to recalculate layout.
 */
@Component({
  selector: 'app-map-2d',
  standalone: true,
  template: `<div #mapContainer class="map-container" role="application" aria-label="Mapa 2D"></div>`,
  styleUrl: './map-2d.component.scss',
})
export class Map2DComponent implements AfterViewInit, OnDestroy {
  private readonly mapContainer = viewChild.required<ElementRef<HTMLDivElement>>('mapContainer');
  private readonly mapMode = inject(MapModeService);
  private map?: Map;

  constructor() {
    // Recalculate map size when switching back to 2D mode
    effect(() => {
      if (this.mapMode.mode() === '2d' && this.map) {
        // Allow the DOM to repaint after display change before updating size
        setTimeout(() => this.map?.updateSize(), 50);
      }
    });
  }

  ngAfterViewInit(): void {
    this.map = new Map({
      target: this.mapContainer().nativeElement,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([-3.703, 40.416]), // Madrid, Spain
        zoom: 8,
      }),
    });
  }

  /** Expose for parent to trigger resize if needed */
  updateSize(): void {
    this.map?.updateSize();
  }

  ngOnDestroy(): void {
    this.map?.setTarget(undefined as unknown as HTMLElement);
    this.map = undefined;
  }
}
