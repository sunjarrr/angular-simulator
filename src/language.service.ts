import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './enums/Language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private localStorage: LocalStorageService = inject(LocalStorageService);
  private translate: TranslateService = inject(TranslateService);

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
    this.localStorage.setValues("appLanguage", language);
  }

  initLanguage(): void {
    const determine: Language = this.determineLanguage();
    this.translate.setFallbackLang(Language.RU);
    this.setLanguage(determine);
  }

}