import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'correctWord',
})
export class CorrectWordPipe implements PipeTransform {

  transform(number: number, firstForm: string, secondForm: string, thirdForm: string): string {
    if (number === 1) {
      return `${ number } ${ firstForm }`;
    } else if (number > 1 && number <= 4) {
      return `${ number } ${ secondForm }`;
    } else {
      return `${ number } ${ thirdForm }`;
    }
  }

}