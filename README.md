# Artillery Simulator UI

Frontend Angular 21 para simulador de artillería ejecutado mediante CEF (Chromium Embedded Framework) sobre una aplicación VBS (Virtual Battle Space).

## Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | 21.2 | Framework — standalone components, signals |
| Angular Material | 21.2 | UI components, M3 theming |
| OpenLayers | 10.x | Mapa 2D con base OSM |
| RxJS | 7.8 | Streams reactivos (HostBridgeService) |
| SCSS | — | Theming con variables/mixins |
| ESLint + Prettier | — | Calidad de código |

## Estructura de carpetas

```
src/app/
├── core/services/
│   ├── host-bridge.service.ts    # Bridge CEF/VBS (stubs con documentación)
│   ├── theme.service.ts          # Toggle luz/oscuro persistido en localStorage
│   ├── map-mode.service.ts       # Toggle 2D/3D + transparencia CEF
│   ├── simulation.service.ts     # Play/Pause → envía comandos al host
│   └── drawer-state.service.ts  # Estado del drawer lateral
├── shared/
│   ├── models/                   # Entity, Layer — interfaces + mock data
│   └── components/icon-button/  # Botón icono reutilizable
├── features/
│   ├── sidebar/                  # Navbar vertical izquierdo
│   ├── map-2d/                   # Wrapper OpenLayers
│   ├── map-3d/                   # Placeholder transparente para VBS
│   ├── drawers/
│   │   ├── entity-tree/          # Árbol de unidades (mock estático)
│   │   ├── entity-list/          # Lista de entidades activas
│   │   └── layers-panel/         # Capas GIS con toggles
│   └── controls/
│       ├── play-pause-button/
│       ├── mode-2d-3d-toggle/
│       └── theme-toggle/
```

## Instalación

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm start
# → http://localhost:4200
```

## Build de producción

```bash
npm run build:prod
# Artefactos en dist/angular-ios/
```

El bundle inicial comprimido es ~172 kB (OpenLayers se code-split en chunk lazy).

## Theming — cambio de tema

### En la UI
Pulsar el icono de luna/sol en la parte inferior del navbar izquierdo.

### Persistencia
La preferencia se guarda en `localStorage` bajo la clave `artillery-ui-theme`.
Si no hay preferencia guardada, se respeta `prefers-color-scheme` del sistema operativo.

### Programáticamente
```typescript
import { ThemeService } from './core/services/theme.service';

const theme = inject(ThemeService);
theme.setDark(true);   // modo oscuro
theme.setDark(false);  // modo claro
theme.toggle();        // alternar
```

El tema funciona añadiendo/quitando la clase `.dark-theme` en el elemento `<html>`,
lo que activa el bloque `html.dark-theme { }` en `material-theme.scss` con las
CSS variables de Angular Material M3.

## Toggle 2D/3D

Pulsar el icono de vista AR (3D) / mapa (2D) en la parte inferior del navbar.

**Modo 2D:** OpenLayers renderiza el mapa OSM.

**Modo 3D:** El mapa OpenLayers se oculta (`display: none`), el área del canvas queda
`background: transparent` y la clase `mode-3d` se añade al `<body>`. El host CEF/VBS
renderiza su escena 3D debajo de la ventana Angular.

Para que la transparencia funcione en CEF, el navegador embebido debe estar configurado
con soporte de fondo transparente (ver sección de integración CEF más abajo).

## Toggle Play/Pause

Pulsar el icono play/pause en la parte inferior del navbar.
En la implementación stub, llama a `HostBridgeService.sendCommand('sim.play'/'sim.pause')`.

## Integración con VBS/CEF

### Arquitectura
```
VBS (C++) ←──── CefSharp / CEF ────→ Angular (este proyecto)
               window.__vbsEvent()       HostBridgeService.onEvent()
               CefSharp.PostMessage()    HostBridgeService.sendCommand()
```

### Pasos para conectar

1. **Abrir `src/app/core/services/host-bridge.service.ts`**

2. **Angular → VBS** (enviar comandos):
   Reemplazar el stub en `sendCommand()`:
   ```typescript
   // Reemplazar esto:
   console.info('[HostBridgeService] sendCommand (stub):', command, payload);
   // Con:
   (window as any).CefSharp?.PostMessage(JSON.stringify({ command, payload }));
   ```

3. **VBS → Angular** (recibir eventos):
   En `initBridge()`, registrar el handler global que VBS llamará desde C++:
   ```typescript
   (window as any).__vbsEvent = (event: string, payload: unknown) => {
     this.eventBus$.next({ event, payload });
   };
   ```
   Desde C++, VBS llama al JavaScript:
   ```cpp
   browser->GetMainFrame()->ExecuteJavaScript(
     "window.__vbsEvent('sim.update', JSON.stringify({entities: [...]}));",
     browser->GetMainFrame()->GetURL(), 0);
   ```

4. **Suscribirse a eventos en componentes**:
   ```typescript
   this.bridge.onEvent<SimUpdatePayload>('sim.update').subscribe(data => {
     // Actualizar mapa, árbol de entidades, etc.
   });
   ```

5. **Configurar CEF para transparencia** (necesario para modo 3D):
   ```cpp
   CefWindowInfo windowInfo;
   CefBrowserSettings browserSettings;
   // Activar fondo transparente:
   windowInfo.SetAsWindowless(parentHwnd);
   browserSettings.background_color = 0x00000000; // ARGB transparent
   ```

## Lint y formato

```bash
npm run lint      # ESLint
npm run format    # Prettier
```
