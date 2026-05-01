import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { routes } from './app.routes';
import { Themes } from '../enums/Themes';
import { Preset } from '@primeuix/themes/types';

function getTheme(): Preset {
  const value: string | null = localStorage.getItem('my-app-theme');
  const theme: string | null = value ? JSON.parse(value) : null;
  const complianceCard: Record<string, Preset> = {
    [Themes.aura]: Aura,
    [Themes.lara]: Lara,
    [Themes.nora]: Nora,
  };
  return (theme && complianceCard[theme]) ? complianceCard[theme] : Aura;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getTheme(),
        options: {
          darkModeSelector: '.my-app-dark'
        }
      }
    })
  ]
};