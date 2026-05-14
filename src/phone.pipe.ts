import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {

  transform(phone: string, phoneMode: string): unknown {
    const clearedPhone: string = phone.replace(/[()-. ]/g, '');
    if (phoneMode === 'compact') {
      return `${'+'} ${clearedPhone}`
    } else if (phoneMode === 'international') {
      return `${'+'} ${clearedPhone.slice(0,2)} ${clearedPhone.slice(2,5)} ${clearedPhone.slice(5,8)} ${clearedPhone.slice(8,10)} ${clearedPhone.slice(10,12)}`;
    } else if (phoneMode === 'national') {
      return `${clearedPhone.slice(2,5)} ${clearedPhone.slice(5,8)} ${clearedPhone.slice(8,10)} ${clearedPhone.slice(10,12)}`;
    } else if (phoneMode === 'masked') {
      return `${'+'} ${clearedPhone.slice(0,2)} ${clearedPhone.slice(2,5)} ${'***'} ${'**'} ${clearedPhone.slice(10,12)}`;
    }
    return clearedPhone;
  }

}