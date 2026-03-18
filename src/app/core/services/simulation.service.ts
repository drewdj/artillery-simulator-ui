import { Injectable, signal } from '@angular/core';
import { HostBridgeService } from './host-bridge.service';

/**
 * SimulationService — Controls the simulation play/pause state.
 *
 * Notifies the VBS host via HostBridgeService when state changes.
 */
@Injectable({ providedIn: 'root' })
export class SimulationService {
  readonly isPlaying = signal<boolean>(false);

  constructor(private readonly bridge: HostBridgeService) {}

  toggle(): void {
    const next = !this.isPlaying();
    this.isPlaying.set(next);
    this.bridge.sendCommand(next ? 'sim.play' : 'sim.pause', {});
  }

  play(): void {
    this.isPlaying.set(true);
    this.bridge.sendCommand('sim.play', {});
  }

  pause(): void {
    this.isPlaying.set(false);
    this.bridge.sendCommand('sim.pause', {});
  }
}
