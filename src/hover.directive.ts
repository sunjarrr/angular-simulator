import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[hover]',
})
export class HoverDirective {

  @HostBinding('style.font-weight') textWeight: string = 'normal';

  @HostListener('mouseenter')
  onEnter() {
    this.textWeight = 'bold';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.textWeight = 'normal';
  }

}