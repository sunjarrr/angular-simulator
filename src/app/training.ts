/*3. Создать функцию, которая принимает 2 числа и возвращает их сумму. 
 Полностью типизировать параметры, значение, возвращаемое функцией.*/
export const sum = (a: number, b: number): number => {
  return a + b;
}
console.log(sum(19, 29));

/*4. Создать переменную status, которая может быть только: 
"loading", "success", "error".*/
let status: 'loading' | 'succes' | 'error';

/*5. Создать переменную textFormat, которая может быть только: 
'uppercase', 'lowercase', 'capitalize'".*/
let textFormat: 'uppercase' | 'lowercase' | 'capitalize';

/*6. Создать интерфейс, который описывает юзера. 
Поля на ваш выбор. Одно поле должно быть опциональным.*/
interface IUser {
  age: number,
  height: number,
  weight?: number,
  name: string,
  country: string,
  city: string
}

const user: IUser = {
  age: 21,
  height: 175,
  name: 'Dante',
  country: 'Kazakhstan',
  city: 'Astana'
}

/*7. Создать интерфейс, который расширяется интерфейсом 
User с задания №5 и имеет свои дополнительные поля */
interface IProgrammers extends IUser {
  level: string,
  stack: string,
  experience: number,
  salary: number
}

const programmer: IProgrammers = {
  age: 21,
  height: 175,
  name: 'Dante',
  country: 'Kazakhstan',
  city: 'Astana',
  level: 'middle',
  stack: 'Angular',
  experience: 2,
  salary: 2000
}

/*8. Создать функцию, которая принимает строку и вариант,  
как именно форматировать строку (задание №5) и на основе 
этого возвращает форматированную строку.*/
const formatText = (text: string, format: 'uppercase' | 'lowercase' | 'capitalize'): string => {
  if (format === 'uppercase') {
    return text.toUpperCase();
  } else if (format === 'lowercase') {
    return text.toLowerCase();
  } else {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}
console.log(formatText('angular', 'capitalize'));

/*9. Создать функцию, которая принимает строку и символ, 
возвращает строку без переданного символа.  
(есть специальные методы для этого, гуглим)*/
const removeSymbol = (text: string, symbol: string): string => {
  return text.replaceAll(symbol, '');
}
console.log(removeSymbol('Hello', 'lo'));

/*10. Создать массив объектов на основе интерфейса с задания №6. 
Отфильтровать его по одному из параметров.*/
const earthlings: IUser[] = [
  {
    age: 18,
    name: 'Ibragim',
    height: 175,
    country: 'Kazakhstan',
    city: 'Astana'
  },
  {
    age: 18,
    name: 'Isabella',
    height: 172,
    country: 'Italy',
    city: 'Palermo'
  },
  {
    age: 18,
    name: 'Enzo',
    height: 180,
    country: 'Italy',
    city: 'Palermo'
  }
]

const country: IUser[] = earthlings.filter((earthman: IUser) => earthman.country === 'Italy');
console.log(country);