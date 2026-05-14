import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IGradient } from './interfaces/IGradient';

@Directive({
  selector: '[animatedGradient]',
})
export class AnimatedGradientDirective {

  isActive!: boolean;
  timer!: number;

  @Input('GradientConfiguration') settings: IGradient = {
    delay: 1000,
    colors: ['red', 'yellow', 'green'],
    thickness: 2,
  };

  @HostBinding('style.borderImage')
  get elementBorder(): string {
    if (this.isActive) {
      return `linear-gradient(${this.settings.colors?.join(', ')}) ${this.settings.thickness}`;
    } else {
      return 'none';
    }
  }

  @HostListener('mouseenter')
  onEnter(): void {
    this.timer = setTimeout(() => {
      this.isActive = true;
    }, this.settings.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.isActive = false;
    clearTimeout(this.timer);
  }

}