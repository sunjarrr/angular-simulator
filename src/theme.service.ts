import { inject, Injectable } from '@angular/core';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { Preset } from '@primeuix/themes/types';
import { LocalStorageService } from './local-storage.service';
import { IThemeOption } from './interfaces/IThemeOption';
import { Themes } from './enums/Themes';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getMode());
  mode$: Observable<boolean> = this.isDarkModeSubject.asObservable().pipe(
    tap((isDarkMode: boolean) => {
      const element: HTMLElement = document.documentElement;
      isDarkMode ? element.classList.add('my-app-dark') : element.classList.remove('my-app-dark');
    }),
  );
  private switchThemeSubject: BehaviorSubject<string> = new BehaviorSubject<string>('aura');
  theme$: Observable<string> = this.switchThemeSubject.asObservable();

  themes: IThemeOption[] = [
    {
      label: 'Aura',
      value: Themes.aura,
    },
    {
      label: 'Lara',
      value: Themes.lara,
    },
    {
      label: 'Nora',
      value: Themes.nora,
    }
  ]

  complianceCard: Record<string, Preset> = {
    aura: Aura,
    lara: Lara,
    nora: Nora,
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    this.localStorageService.setValues('is-dark', isDarkMode);
  }

  initTheme(): void {
    const currentTheme: string = this.localStorageService.getValues('my-app-theme') as string;
    const newTheme: string = currentTheme || 'aura'
    this.switchThemeSubject.next(newTheme);
  }

  private getMode(): boolean {
    return this.localStorageService.getValues('is-dark') ?? false;
  }

  constructor() {
    this.initTheme();
    this.switchThemeSubject.pipe(
      distinctUntilChanged(),
      tap((newTheme: string) => {
        this.setTheme(newTheme);
      })).subscribe();
  }

  setTheme(newTheme: string): void {
    const themes: Preset = this.complianceCard[newTheme];
    if (themes) {
      usePreset(themes);
    };
    this.localStorageService.setValues('my-app-theme', newTheme);
  }

  switchTheme(newTheme: string): void {
    this.switchThemeSubject.next(newTheme);
  }

}