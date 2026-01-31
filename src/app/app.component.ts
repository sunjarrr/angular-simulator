import { Component } from '@angular/core';
import './training';
import './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'румтибет';

  isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

  saveLastVisit(): void {
    const date: Date = new Date();
    localStorage.setItem('lastVisit', JSON.stringify(date));
  }

  saveVisitCount(): void {
    const storedCount: string | null = localStorage.getItem('visitCount');
    let count: number = !storedCount ? 1 :  Number(storedCount) + 1;
    localStorage.setItem('visitCount', JSON.stringify(count));
  }

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }
}

