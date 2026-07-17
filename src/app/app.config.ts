import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
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
import { authInterceptor } from '../features/auth/auth.interceptor';
import { AuthService } from '../features/auth/auth.service';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { applicationConfig } from '../config.token';

function getTheme(): Preset {
  const value: string | null = localStorage.getItem('my-app-theme');
  const theme: string | null = value ? JSON.parse(value) : null;
  const complianceCard: Record<string, Preset> = {
    [Theme.AURA]: Aura,
    [Theme.LARA]: Lara,
    [Theme.NORA]: Nora,
  };
  return theme && complianceCard[theme] ? complianceCard[theme] : Aura;
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
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    provideHttpClient(withInterceptors([LoggingInterceptor, ErrorInterceptor, authInterceptor])),
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      return authService.getCurrentProfile();
    }),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'dd.MM.yyyy HH:mm',
      }
    },
    {
      provide: applicationConfig,
      useValue: {
        companyName: 'РУМТИБЕТ',
        enableLogs: true,
        enableNotifications: true,
        enableTheming: true,
        sessionTimeout: 1
      }
    }
  ],
};
