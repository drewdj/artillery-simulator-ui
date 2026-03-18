import { Routes } from '@angular/router';

/**
 * App Routes — Artillery Simulator UI
 *
 * The main simulation view is rendered directly by AppComponent (no routing
 * needed for the primary layout). These routes are defined for future feature
 * pages and demonstrate the lazy-loading pattern for standalone components.
 */
export const routes: Routes = [
  // Future: lazy-loaded standalone feature pages
  // {
  //   path: 'settings',
  //   loadComponent: () =>
  //     import('./features/settings/settings.component').then(m => m.SettingsComponent),
  // },
];
