import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setValues<T>(key: string, value: T): void {
    const values: string = JSON.stringify(value);
    localStorage.setItem(key, values);
  }

  getValues<T>(key: string): T | null {
    const value: string | null = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : null;
  }

  clearElement(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
