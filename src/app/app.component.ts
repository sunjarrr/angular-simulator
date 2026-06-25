import { Component } from '@angular/core';
import './training';
import './collection';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet, MessageComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  private isMainColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return mainColors.includes(color);
  }

}