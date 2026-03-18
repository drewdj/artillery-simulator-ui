import { Component, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

/**
 * Reusable icon button with tooltip and ARIA support.
 * Used throughout the sidebar and controls.
 */
@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [MatIconButton, MatIcon, MatTooltip],
  template: `
    <button
      mat-icon-button
      [matTooltip]="tooltip()"
      matTooltipPosition="right"
      [attr.aria-label]="ariaLabel() || tooltip()"
      [class.active]="active()"
      (click)="clicked.emit()"
    >
      <mat-icon>{{ icon() }}</mat-icon>
    </button>
  `,
  styleUrl: './icon-button.component.scss',
})
export class IconButtonComponent {
  readonly icon = input.required<string>();
  readonly tooltip = input.required<string>();
  readonly ariaLabel = input<string>('');
  readonly active = input<boolean>(false);
  readonly clicked = output<void>();
}
