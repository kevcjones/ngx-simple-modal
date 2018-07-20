import { Component } from '@angular/core';
import { SimpleModalComponent } from '../../simple-modal/simple-modal.component';

export interface AlertModel {
  title: string;
}

@Component({
  selector: 'alert',
  template: `<div class="modal-dialog">{{title}}</div>`,
})
export class AlertComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {
  title: string;
  constructor() {
    super();
  }
}
