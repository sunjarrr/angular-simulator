import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from './enums/Languages';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  localStorage: LocalStorageService = inject(LocalStorageService);
  translate: TranslateService = inject(TranslateService);

  determineLanguage(): Languages {
    const savedLanguage: Languages | null = this.localStorage.getValue<Languages>("appLanguage");
    const browserLanguage: Languages = navigator.language.split('-')[0] as Languages;
    if (savedLanguage && Object.values(Languages).includes(savedLanguage)) {
      return savedLanguage;
    } else if (Object.values(Languages).includes(browserLanguage)) {
      this.localStorage.setValues('appLanguage', browserLanguage);
      return browserLanguage;
    } else {
      this.localStorage.setValues('appLanguage', Languages.RU);
      return Languages.RU;
    }
  }

  setLanguage(language: Languages): void {
    if (Object.values(Languages).includes(language)) {
      this.translate.use(language);
      this.localStorage.setValues("appLanguage", language);
    }
  }

  initLanguage(): void {
    const determine: Languages = this.determineLanguage();
    this.translate.setFallbackLang(Languages.RU);
    this.setLanguage(determine);
  }

}