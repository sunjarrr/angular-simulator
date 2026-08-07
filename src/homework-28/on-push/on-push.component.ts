import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-on-push',
  imports: [],
  templateUrl: './on-push.component.html',
  styleUrl: './on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent implements DoCheck {

  count: number = 0;
  private httpClient: HttpClient = inject(HttpClient);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngDoCheck(): void {
    console.log('ngDoCheck called')
    console.log('Change Detection');
  }

  increment(): void {
    this.count++;
    this.cdr.detach();
  }

  onClickSetTimeout(): void {
    setTimeout(() => {
      this.count++;
      this.cdr.detach();
      this.cdr.reattach();
      this.cdr.detectChanges();
    }, 2000)
  }

  onClickPromise(): void {
    Promise.resolve().then(() => {
      this.count++;
      this.cdr.detach();
    })
  }

  onClickHttpClient(): Observable<object> {
    return this.httpClient.get('https://jsonplaceholder.typicode.com/users');
  }

  onClickSetInterval(): void {
    setInterval(() => {
      this.count++;
      this.cdr.detach();
    }, 5000)
  }

  onClickMultiple(): void {
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
Часть 1

1. На примере setTimeout произошло обновление интерфейса тогда когда прошло 2 секунды заданная в условии. 
И вот как раз MarkForCheсk позволило показаться этому в интерфейсе, так как без него изменение не отобразились бы в интерфейсе.

2. На примере ассинхронной операции нет не сразу а на примере простого инкрементера да сразу, так как сам по себе инкеремент это DOM событие котрое вызывает проверку.

3. Фактический сразу же после нажатия он не зависит от того пропишим мы marForCheck или нет. CD срабатывает всегда даже если это не видно через интерфейс.

4. Потому что при первом нажатии значение изменяется и сохраняется в памяти но не отображается в интерфейс.
Чтобы увидеть это увеличение значения в интерфейсе нужно еще раз нажжать кнопку, и тогда значение берется из памяти.

Часть 2

1.По сути в нашем сценарии ничем, но сам по себе detectChanges заставляет сразу же отображаться изменению интерфейса в текущем цикле,
без того чтобы говорить ангуляру что в следуюшем CD цикле проверить компонент.

2. Да выполняется

3. Только этот компонент on-push так как detectChanges заставляет проверять начиная с себя(с компонента где он записан) и до дочерних компонентов включительно.

4. Когда нам нужно проверить определенный нужный нам компонент сразу же.

Часть 3

1. Нет не обновляется.

2. Да выполняется

3. Так как detach полностью отключает компонент из дерева проверки компонентов.

4. Все способы изменения значения где прописан detach не работают.

Часть 4

1. Компонет вернулся в дерево компонентов и снова начал проверяться.

2. тогда когда мы с помощью reattach вернули компонент в пул компонентов.

3. Да нужно так как сам reattach просто уведомляет ангуляр вернуть компонент но не выполняет рендер(измненение интерфейса).
*/
