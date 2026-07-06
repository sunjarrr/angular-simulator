import { inject, Injectable } from '@angular/core';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { Preset } from '@primeuix/themes/types';
import { LocalStorageService } from './local-storage.service';
import { IThemeOption } from './interfaces/IThemeOption';
import { Theme } from './enums/Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.getMode(),
  );

  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable().pipe(
    tap((isDarkMode: boolean) => {
      const element: HTMLElement = document.documentElement;
      isDarkMode ? element.classList.add('my-app-dark') : element.classList.remove('my-app-dark');
    }),
  );

  private switchThemeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.AURA);
  theme$: Observable<Theme> = this.switchThemeSubject.asObservable();

  themes: IThemeOption[] = [
    {
      label: 'Aura',
      value: Theme.AURA,
    },
    {
      label: 'Lara',
      value: Theme.LARA,
    },
    {
      label: 'Nora',
      value: Theme.NORA,
    },
  ];

  complianceCard: Record<Theme, Preset> = {
    [Theme.AURA]: Aura,
    [Theme.LARA]: Lara,
    [Theme.NORA]: Nora,
  };

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    this.localStorageService.setValues('is-dark', isDarkMode);
  }

  initTheme(): void {
    const currentTheme: Theme = this.localStorageService.getValue('my-app-theme') as Theme;
    const newTheme: Theme = currentTheme || Theme.AURA;
    this.switchThemeSubject.next(newTheme);
  }

  private getMode(): boolean {
    return this.localStorageService.getValue('is-dark') ?? false;
  }

  constructor() {
    this.initTheme();
    this.switchThemeSubject
      .pipe(
        distinctUntilChanged(),
        tap((newTheme: Theme) => {
          this.setTheme(newTheme);
        }),
      )
      .subscribe();
  }

  setTheme(newTheme: Theme): void {
    const themes: Preset = this.complianceCard[newTheme];
    if (themes) {
      usePreset(themes);
    }
    this.localStorageService.setValues('my-app-theme', newTheme);
  }

  switchTheme(newTheme: Theme): void {
    this.switchThemeSubject.next(newTheme);
  }

}
