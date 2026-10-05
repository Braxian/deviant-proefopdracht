import { Service } from '@angular/core';
import { OefeningState } from '../oefening/store/oefening.reducer';

@Service()
export class OefeningStorage {
  private readonly storageKey = 'oefening-state';

  save(state: OefeningState): void {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }

  load(): OefeningState | null {
    const state = localStorage.getItem(this.storageKey);

    if (!state) {
      return null;
    }
    return JSON.parse(state);
  }

  clearStorage(): void {
    localStorage.removeItem(this.storageKey);
  }
}
