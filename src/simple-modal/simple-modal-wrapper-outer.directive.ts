import { Directive, Inject, ViewContainerRef, ElementRef } from '@angular/core';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';

@Directive({
  selector: '[simpleModalWrapperOuterContainer]',
})
export class SimpleModalWrapperOuterContainerDirective {
  constructor(el: ElementRef, private modalWrapper: SimpleModalWrapperComponent) {
    if (el.constructor.name === 'ElementRef') {
      this.modalWrapper.wrapper = el;
    } // true
  }
}
