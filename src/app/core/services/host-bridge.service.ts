import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/**
 * HostBridgeService — CEF/VBS Integration Layer
 *
 * This service acts as the communication bridge between the Angular UI and the
 * VBS host application via Chromium Embedded Framework (CEF).
 *
 * How to connect to VBS/CEF:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. VBS → Angular: VBS calls window.__vbsEvent(eventName, payload) from C++.
 *    Register the handler in initBridge() and pipe events into eventBus$.
 *
 * 2. Angular → VBS: Use window.CefSharp.PostMessage() or the CefSharp JS bridge
 *    inside sendCommand(). The exact API depends on the CEF binding setup.
 *
 * Example CEF/CefSharp binding setup (uncomment when ready):
 *
 *   // In VBS/CEF host (C++ side):
 *   // browser->GetMainFrame()->ExecuteJavaScript(
 *   //   "window.__vbsEvent('sim.update', {entities:[...]});", ...);
 *
 *   // In initBridge():
 *   // (window as any).__vbsEvent = (event: string, payload: unknown) => {
 *   //   this.ngZone.run(() => this.eventBus$.next({ event, payload }));
 *   // };
 * ─────────────────────────────────────────────────────────────────────────────
 */
@Injectable({ providedIn: 'root' })
export class HostBridgeService {
  private readonly eventBus$ = new Subject<{ event: string; payload: unknown }>();

  constructor() {
    this.initBridge();
  }

  /**
   * Initialise the bridge between Angular and the CEF/VBS host.
   * Replace the stub body with real CEF binding code when integrating.
   */
  private initBridge(): void {
    // STUB — Replace with real CEF event listener:
    // (window as any).__vbsEvent = (event: string, payload: unknown) => {
    //   this.eventBus$.next({ event, payload });
    // };
    console.info('[HostBridgeService] Bridge initialised (stub mode — no CEF host detected)');
  }

  /**
   * Send a command to the VBS host application.
   *
   * @param command  Dot-notation command name, e.g. 'sim.pause', 'app.close'
   * @param payload  Optional JSON-serialisable payload
   *
   * Replace the stub body with the appropriate CefSharp / CEF binding call:
   *   (window as any).CefSharp?.PostMessage(JSON.stringify({ command, payload }));
   */
  sendCommand(command: string, payload: unknown = {}): void {
    // STUB — Replace with real CEF send:
    // (window as any).CefSharp?.PostMessage(JSON.stringify({ command, payload }));
    console.info('[HostBridgeService] sendCommand (stub):', command, payload);
  }

  /**
   * Subscribe to events emitted by the VBS host.
   *
   * @param eventName  The event identifier to filter on (e.g. 'sim.update')
   * @returns Observable that emits the payload whenever the event fires
   *
   * Usage:
   *   this.bridge.onEvent<SimUpdatePayload>('sim.update').subscribe(data => { ... });
   */
  onEvent<T = unknown>(eventName: string): Observable<T> {
    return this.eventBus$.pipe(
      filter((e) => e.event === eventName),
      map((e) => e.payload as T)
    );
  }
}
