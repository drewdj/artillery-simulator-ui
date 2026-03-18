import { Injectable, signal, effect } from '@angular/core';

export type MapMode = '2d' | '3d';

/**
 * MapModeService — Manages the 2D/3D map toggle.
 *
 * In 3D mode the OpenLayers canvas is hidden and the main area becomes
 * transparent, letting the VBS/CEF host application render underneath.
 */
@Injectable({ providedIn: 'root' })
export class MapModeService {
  readonly mode = signal<MapMode>('2d');

  constructor() {
    effect(() => {
      // Toggle body class for CEF transparency in 3D mode
      document.body.classList.toggle('mode-3d', this.mode() === '3d');
    });
  }

  toggle(): void {
    this.mode.set(this.mode() === '2d' ? '3d' : '2d');
  }

  setMode(mode: MapMode): void {
    this.mode.set(mode);
  }
}
