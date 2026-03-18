import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { Map2DComponent } from './features/map-2d/map-2d.component';
import { Map3DComponent } from './features/map-3d/map-3d.component';
import { EntityTreeComponent } from './features/drawers/entity-tree/entity-tree.component';
import { EntityListComponent } from './features/drawers/entity-list/entity-list.component';
import { LayersPanelComponent } from './features/drawers/layers-panel/layers-panel.component';
import { DrawerStateService } from './core/services/drawer-state.service';
import { MapModeService } from './core/services/map-mode.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatSidenavModule,
    SidebarComponent,
    Map2DComponent,
    Map3DComponent,
    EntityTreeComponent,
    EntityListComponent,
    LayersPanelComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly drawerState = inject(DrawerStateService);
  readonly mapMode = inject(MapModeService);
  // ThemeService auto-initialises via constructor effect
  readonly _theme = inject(ThemeService);
}
