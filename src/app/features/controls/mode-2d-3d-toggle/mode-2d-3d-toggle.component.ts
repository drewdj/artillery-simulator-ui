import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MapModeService } from '../../../core/services/map-mode.service';

@Component({
  selector: 'app-mode-2d-3d-toggle',
  standalone: true,
  imports: [MatIconButton, MatIcon, MatTooltip],
  template: `
    <button
      mat-icon-button
      [matTooltip]="mapMode.mode() === '2d' ? 'Cambiar a modo 3D' : 'Cambiar a modo 2D'"
      matTooltipPosition="right"
      [attr.aria-label]="mapMode.mode() === '2d' ? 'Activar modo 3D' : 'Activar modo 2D'"
      [class.active-3d]="mapMode.mode() === '3d'"
      (click)="mapMode.toggle()"
    >
      <mat-icon>{{ mapMode.mode() === '2d' ? 'view_in_ar' : 'map' }}</mat-icon>
    </button>
  `,
  styleUrl: './mode-2d-3d-toggle.component.scss',
})
export class Mode2D3DToggleComponent {
  readonly mapMode = inject(MapModeService);
}
