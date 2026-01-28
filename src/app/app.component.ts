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
    const main: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return main.includes(color);
  }

  saveLastVisit(): void {
    const date: Date = new Date();
    localStorage.setItem('lastVisit', JSON.stringify(date));
  }

  saveVisitCount(): void {
    const storedCount: string | null = localStorage.getItem('visitCount');
    let count: number;
    if (!storedCount) {
      count = 1;
    } else {
      count = Number(storedCount) + 1;
    }
    localStorage.setItem('visitCount', JSON.stringify(count));
  }

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }
}

