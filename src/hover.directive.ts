import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[hover]',
})
export class HoverDirective {

  @HostBinding('style.font-weight') textWeight = 'normal';

  @HostListener('mouseenter')
  onEnter(): void {
    this.textWeight = 'bold';
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.textWeight = 'normal';
  }

}
