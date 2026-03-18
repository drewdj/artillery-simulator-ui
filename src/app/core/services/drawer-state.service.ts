import { Injectable, signal, computed } from '@angular/core';

export type DrawerPanel = 'entity-tree' | 'entity-list' | 'layers' | null;

/**
 * DrawerStateService — Manages which lateral drawer panel is open.
 *
 * Sidebar icons toggle panels: clicking an active panel closes it;
 * clicking a different panel switches to it while staying open.
 */
@Injectable({ providedIn: 'root' })
export class DrawerStateService {
  readonly activePanel = signal<DrawerPanel>(null);
  readonly isOpen = computed(() => this.activePanel() !== null);

  toggle(panel: DrawerPanel): void {
    this.activePanel.set(this.activePanel() === panel ? null : panel);
  }

  open(panel: DrawerPanel): void {
    this.activePanel.set(panel);
  }

  close(): void {
    this.activePanel.set(null);
  }
}
