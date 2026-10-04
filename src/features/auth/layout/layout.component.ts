import { Component } from '@angular/core';
import { HeaderComponent } from '../../../app/core/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../app/core/components/footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
