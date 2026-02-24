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
    const element: string | null = localStorage.getItem(key);
    return element ? JSON.parse(element) as T : null;
  }

  clearElement(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}