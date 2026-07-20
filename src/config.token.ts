import { InjectionToken } from '@angular/core';
import { IApplicationConfig } from './interfaces/IApplicationConfig';

export const applicationConfig = new InjectionToken<IApplicationConfig>('Config');