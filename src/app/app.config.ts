import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { routes } from './app.routes';
import { Theme } from '../enums/Theme';
import { Preset } from '@primeuix/themes/types';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoggingInterceptor } from '../logging.interceptor';
import { ErrorInterceptor } from '../error.interceptor';

function getTheme(): Preset {
  const value: string | null = localStorage.getItem('my-app-theme');
  const theme: string | null = value ? JSON.parse(value) : null;
  const complianceCard: Record<string, Preset> = {
    [Theme.AURA]: Aura,
    [Theme.LARA]: Lara,
    [Theme.NORA]: Nora,
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
    }),
    provideHttpClient(withInterceptors([LoggingInterceptor, ErrorInterceptor])),
  ]
};