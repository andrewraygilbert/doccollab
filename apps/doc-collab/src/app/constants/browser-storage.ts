import { InjectionToken } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});
