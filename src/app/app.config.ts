import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { routes } from './app.routes';
import { Theme } from './core/enums/Theme';
import { Preset } from '@primeuix/themes/types';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from '../features/auth/auth.service';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideTranslateService, TranslateCompiler } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { LanguageService } from './core/services/language.service';
import { applicationConfig } from './core/tokens/config.token';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';

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
    provideRouter(routes, withComponentInputBinding()),
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
      const languageService: LanguageService = inject(LanguageService);
      languageService.initLanguage();
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
    },
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en',
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler
      }
    }),
  ],
};
