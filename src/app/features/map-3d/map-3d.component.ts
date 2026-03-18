import { Component } from '@angular/core';

/**
 * Map3DComponent — Transparent placeholder for 3D mode.
 *
 * In 3D mode the Angular UI hides the OpenLayers map and makes the canvas area
 * fully transparent so the VBS/CEF host application renders underneath.
 * This component is a minimal transparent shell; no 3D rendering happens here.
 *
 * Any UI overlays (drawers, navbar) continue to render on top as usual.
 *
 * CEF Integration Note:
 * The CEF browser window must be configured with transparent background support
 * (e.g. CefWindowInfo::SetAsWindowless with transparent=true in C++).
 */
@Component({
  selector: 'app-map-3d',
  standalone: true,
  template: `
    <div
      class="map-3d-overlay"
      role="region"
      aria-label="Vista 3D — renderizada por VBS"
    >
      <!-- Transparent area — VBS renders underneath via CEF -->
    </div>
  `,
  styleUrl: './map-3d.component.scss',
})
export class Map3DComponent {}
