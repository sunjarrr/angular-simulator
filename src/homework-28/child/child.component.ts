import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent {

  @Input({ required: true }) user!: { name: string, age: number } 

}

/*
Потому что мы используем стратегию OnPush которая работает так что должна быть причина для того чтобы сработала стратегия.
А у нас тут сам адрес ссылки не меняется и остается тем же. Решение проблемы: Чтобы обновился интерфейс нужно создать новый обьект с новым адресом ссылки и после этого у нас получится перезаписать имя.
Коротко говоря сработало изменение Input а это у нас один из триггеров onPush.
*/