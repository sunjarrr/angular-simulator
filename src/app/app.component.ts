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

  isColorMain(color: Color): boolean {
    return color === Color.BLUE || color === Color.GREEN || color === Color.RED;
  }

  lastVisit(): void {
    const date = new Date();
    localStorage.setItem('lastVisit', JSON.stringify(date));
  }

  visitCount(): void {
    const entrance: string | null = localStorage.getItem('visitCount');
    let count: number;
    if(!entrance) {
      count = 1;
    } else {
      count = Number(entrance) + 1;
    }
    localStorage.setItem('visitCount', JSON.stringify(count));
  }

  constructor() {
    this.lastVisit();
    this.visitCount();
  }
}

