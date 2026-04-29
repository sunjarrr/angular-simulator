import { inject, Injectable } from '@angular/core';
import { updatePrimaryPalette, usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { ITheme } from './interfaces/ITheme';
import { Preset } from '@primeuix/themes/types';
import { IThemeOption } from './interfaces/IThemeOption';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  private switchModeSubject: BehaviorSubject<ITheme> = new BehaviorSubject<ITheme>(this.getTheme());
  switchMode$: Observable<ITheme> = this.switchModeSubject.asObservable();

  themes: IThemeOption[] = [
    {
      label: 'Aura',
      value: 'aura',
    },
    {
      label: 'Lara',
      value: 'lara',
    },
    {
      label: 'Nora',
      value: 'nora',
    }
  ]

  complianceCard: Record<string, Preset> = {
    aura: Aura,
    lara: Lara,
    nora: Nora,
  };

  getTheme(): ITheme {
    return {
      theme: this.localStorageService.getValues('my-app-theme') || 'aura',
      isDark: this.localStorageService.getValues('my-app-dark') === 'dark',
    };
  };

  toggleDarkMode(): void {
    const currentMode: ITheme = this.switchModeSubject.value;
    const newMode: boolean = !currentMode.isDark;
    this.switchModeSubject.next({ ...currentMode, isDark: newMode, })
    newMode ? this.localStorageService.setValues('my-app-dark', 'dark') : this.localStorageService.clearElement('my-app-dark');
  };

  constructor() {
    this.switchModeSubject.pipe(
      distinctUntilChanged((newValue, currentValue) => newValue.isDark === currentValue.isDark),
      tap((themeConfig: ITheme) => {
        themeConfig.isDark ? document.documentElement.classList.add('my-app-dark') : document.documentElement.classList.remove('my-app-dark');
      }),
    ).subscribe();
    const initialTheme: ITheme = this.switchModeSubject.value;
    this.setTheme(initialTheme.theme);
  };

  setTheme(newTheme: string): void {
    const currentState: ITheme = this.switchModeSubject.value;
    this.switchModeSubject.next({ ...currentState, theme: newTheme, });
    const themes: Preset = this.complianceCard[newTheme];
    if (themes) {
      usePreset(themes);
    };
    const colorMap: Record<string, string> = {
      aura: 'blue',
      lara: 'amber',
      nora: 'green',
    };
    const colorName: string = colorMap[newTheme];
    if (colorName) {
      updatePrimaryPalette({
        50: `{${colorName}.50}`,
        100: `{${colorName}.100}`,
        200: `{${colorName}.200}`,
        300: `{${colorName}.300}`,
        400: `{${colorName}.400}`,
        500: `{${colorName}.500}`,
        600: `{${colorName}.600}`,
        700: `{${colorName}.700}`,
        800: `{${colorName}.800}`,
        900: `{${colorName}.900}`,
        950: `{${colorName}.950}`,
      });
    };
    this.localStorageService.setValues('my-app-theme', newTheme);
  };

}