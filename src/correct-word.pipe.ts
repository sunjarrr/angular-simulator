import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'correctWord',
})
export class CorrectWordPipe implements PipeTransform {

  transform(number: number, firstForm: string, secondForm: string, thirdForm: string): unknown {
    return number === 1 ? `${number} ${firstForm}` : number > 1 && number <= 4 ? `${number} ${secondForm}` : `${number} ${thirdForm}`;
  }

}