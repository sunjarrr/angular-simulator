import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TranslateService, Translation } from '@ngx-translate/core';
import { Language } from './enums/Language';
import { tap } from 'rxjs';
import { PrimeNG } from 'primeng/config';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private localStorage: LocalStorageService = inject(LocalStorageService);
  private translate: TranslateService = inject(TranslateService);
  private config: PrimeNG = inject(PrimeNG);

  determineLanguage(): Language {
    const savedLanguage : Language | null = this.localStorage.getValue<Language>("appLanguage");
    const browserLanguage: Language = navigator.language.split('-')[0] as Language;
    const checkLocalStorage: boolean = Object.values(Language).includes((savedLanguage) as Language);
    const checkBrowserLanguage: boolean = Object.values(Language).includes(browserLanguage);
    if (savedLanguage && checkLocalStorage) {
      return savedLanguage;
    } else if (checkBrowserLanguage) {
      this.localStorage.setValues('appLanguage', browserLanguage);
      return browserLanguage;
    } else {
      this.localStorage.setValues('appLanguage', Language.RU);
      return Language.RU;
    }
  }

  setLanguage(language: Language | string): void {
    this.translate.use(language);
    this.translate.get('primeNG')
      .pipe(
        tap((translate: Translation) => {
          this.config.setTranslation(translate);
      })).subscribe();
    this.localStorage.setValues("appLanguage", language);
  }

  initLanguage(): void {
    const determine: Language = this.determineLanguage();
    this.translate.setFallbackLang(Language.RU);
    this.setLanguage(determine);
  }

}