import { Directive, Inject, ViewContainerRef } from '@angular/core';
import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';

@Directive({
  selector: '[simpleModalWrapperContainer]',
})
export class SimpleModalWrapperContainerDirective {
  constructor(vc: ViewContainerRef, private modalWrapper: SimpleModalWrapperComponent) {
    if (vc.constructor.name === 'ViewContainerRef_') {
      this.modalWrapper.viewContainer = vc;
    } // true
  }
}
