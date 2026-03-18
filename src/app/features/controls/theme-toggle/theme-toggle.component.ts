import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatIconButton, MatIcon, MatTooltip],
  template: `
    <button
      mat-icon-button
      [matTooltip]="theme.isDark() ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
      matTooltipPosition="right"
      [attr.aria-label]="theme.isDark() ? 'Activar tema claro' : 'Activar tema oscuro'"
      (click)="theme.toggle()"
    >
      <mat-icon>{{ theme.isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
    </button>
  `,
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  readonly theme = inject(ThemeService);
}
