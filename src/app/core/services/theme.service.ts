import { Injectable, signal, effect } from '@angular/core';

const STORAGE_KEY = 'artillery-ui-theme';

/**
 * ThemeService — Manages light/dark theme toggle.
 *
 * Applies .dark-theme class to <html> element for Angular Material M3 CSS
 * variable overrides. Persists preference in localStorage.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal<boolean>(this.loadFromStorage());

  constructor() {
    effect(() => {
      this.applyTheme(this.isDark());
    });
  }

  toggle(): void {
    this.isDark.set(!this.isDark());
    localStorage.setItem(STORAGE_KEY, String(this.isDark()));
  }

  setDark(value: boolean): void {
    this.isDark.set(value);
    localStorage.setItem(STORAGE_KEY, String(value));
  }

  private loadFromStorage(): boolean {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === 'true';
    // Fallback: respect OS preference
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  private applyTheme(dark: boolean): void {
    document.documentElement.classList.toggle('dark-theme', dark);
  }
}
