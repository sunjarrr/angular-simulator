import { Pipe, PipeTransform } from '@angular/core';
import { PhoneMode } from './enums/PhoneMode';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {

  transform(phone: string, phoneMode: PhoneMode): unknown {
    const clearedPhone: string = phone.replace(/[()-. ]/g, '');
    const countryCode: string = clearedPhone.slice(0,2);
    const operatorCode: string = clearedPhone.slice(2,5);
    const firstPart: string = clearedPhone.slice(5,8);
    const secondPart: string = clearedPhone.slice(8,10);
    const thirdPart: string = clearedPhone.slice(10,12);
    switch (phoneMode) {
      case PhoneMode.COMPACT :
        return `+ ${clearedPhone}`
      case PhoneMode.INTERNATIONAL:
        return `+ ${countryCode} ${operatorCode} ${firstPart} ${secondPart} ${thirdPart}`;
      case PhoneMode.NATIONAL:
        return `${operatorCode} ${firstPart} ${secondPart} ${thirdPart}`;
      case PhoneMode.MASKED:
        return `+ ${countryCode} ${operatorCode} *** ** ${thirdPart}`;
    }
  }

}