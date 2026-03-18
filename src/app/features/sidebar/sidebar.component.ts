import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { DrawerStateService, DrawerPanel } from '../../core/services/drawer-state.service';
import { HostBridgeService } from '../../core/services/host-bridge.service';
import { PlayPauseButtonComponent } from '../controls/play-pause-button/play-pause-button.component';
import { Mode2D3DToggleComponent } from '../controls/mode-2d-3d-toggle/mode-2d-3d-toggle.component';
import { ThemeToggleComponent } from '../controls/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatTooltip,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDivider,
    PlayPauseButtonComponent,
    Mode2D3DToggleComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly drawer = inject(DrawerStateService);
  private readonly bridge = inject(HostBridgeService);

  isActive(panel: DrawerPanel): boolean {
    return this.drawer.activePanel() === panel;
  }

  toggleDrawer(panel: DrawerPanel): void {
    this.drawer.toggle(panel);
  }

  confirmClose(): void {
    // Stub: integrar con MatDialog para un confirm dialog personalizado si se desea.
    // En producción, esto llama a HostBridgeService para cerrar la aplicación vía CEF.
    if (confirm('¿Cerrar la aplicación?')) {
      this.bridge.sendCommand('app.close', {});
    }
  }
}
