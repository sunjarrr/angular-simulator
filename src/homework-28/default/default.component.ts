import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, DoCheck, inject } from '@angular/core';

@Component({
  selector: 'app-default',
  imports: [],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DefaultComponent implements DoCheck {

  count: number = 0;
  httpClient: HttpClient = inject(HttpClient);

  ngDoCheck() {
    console.log('Change Detection, count =', this.count);
  }

  increment() {
    this.count++;
  }

  onClickSetTimeout() {
    setTimeout(() => {
      this.count++
    }, 2000)
  }

  onClickPromise() {
    Promise.resolve().then(() => {
      this.count++;
    })
  }

  onClickHttpClient() {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

  onClickSetInterval() {
    setInterval(() => {
      this.count++;
    }, 5000)
  }

  multipleEvents() {
    this.count++;
    setTimeout(() => {
      this.count++
    }, 2000)
    setInterval(() => {
      this.count++;
    }, 5000)
  }

}

/*
1. Атвоматический нет, только при нажатии кнопок обновился.

2. Первая кнопка 1 раз. Вторая кнопка 1 раз когда нажал оповещение о событии и 2 раз когда прошел таймер setTimeout в общем 2 раза.
Третья кнопка 1 раз так как событие выполнилось один раз потому что Promise это у нас ассинхронная разовая операция.
Четвертая кнопка тоже 1 раз(1 запрос). Пятая кнопка та же последовательность как в setTimout но тут если 1 раз нажать то мы запускаем бесконечный процесс подсчета.
Пятая кнопка 3 раза. В общей сложности ngDoCheck выполнился 10 раз не учитывая бесконечность setInterval.

3. Нет не понадобилось так как у нас тут default стратегия.

4. Причиной запуска является произошедшее событие в компоненте. ZoneJS оповестил Angular и он в свою очередь запустил CD.
*/