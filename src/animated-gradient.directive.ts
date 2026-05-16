import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { IGradientConfig } from './interfaces/IGradient';

@Directive({
  selector: '[animatedGradient]',
})
export class AnimatedGradientDirective {

  isActive!: boolean;
  timer!: number;

  @Input('GradientConfiguration') gradientSettings: IGradientConfig = {
    delay: 1000,
    colors: ['red', 'yellow', 'green'],
    thickness: 2,
  };

  @HostBinding('style.borderImage')
  get elementBorder(): string {
    if (this.isActive) {
      return `linear-gradient(${ this.gradientSettings.colors?.join(', ') }) ${ this.gradientSettings.thickness }`;
    } else {
      return 'none';
    }
  }

  @HostListener('mouseenter')
  onEnter(): void {
    this.timer = setTimeout(() => {
      this.isActive = true;
    }, this.gradientSettings.delay);
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.isActive = false;
    clearTimeout(this.timer);
  }

}