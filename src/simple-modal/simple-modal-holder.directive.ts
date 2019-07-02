import { Directive, ViewContainerRef } from '@angular/core';
import { SimpleModalHolderComponent } from './simple-modal-holder.component';

@Directive({
  selector: '[simpleModalHolderContainer]',
})
export class SimpleModalHolderContainerDirective {
  constructor(vc: ViewContainerRef, private modalHolder: SimpleModalHolderComponent) {
    if (vc.constructor.name === 'ViewContainerRef_') {
      this.modalHolder.viewContainer = vc;
    } // true
  }
}
