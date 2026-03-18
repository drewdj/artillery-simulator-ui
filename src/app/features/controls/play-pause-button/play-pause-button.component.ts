import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { SimulationService } from '../../../core/services/simulation.service';

@Component({
  selector: 'app-play-pause-button',
  standalone: true,
  imports: [MatIconButton, MatIcon, MatTooltip],
  template: `
    <button
      mat-icon-button
      [matTooltip]="sim.isPlaying() ? 'Pausar simulación' : 'Iniciar simulación'"
      matTooltipPosition="right"
      [attr.aria-label]="sim.isPlaying() ? 'Pausar simulación' : 'Iniciar simulación'"
      [class.playing]="sim.isPlaying()"
      (click)="sim.toggle()"
    >
      <mat-icon>{{ sim.isPlaying() ? 'pause' : 'play_arrow' }}</mat-icon>
    </button>
  `,
  styleUrl: './play-pause-button.component.scss',
})
export class PlayPauseButtonComponent {
  readonly sim = inject(SimulationService);
}
