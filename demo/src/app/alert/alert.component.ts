import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface AlertModel {
  title: string;
  message: string;
}

@Component({
  selector: 'alert',
  template: `
    <div class="modal_box">
      <div class="modal_head">
        <h4>{{title || 'Alert!'}}</h4>
      </div>
      <div class="modal_body">
        <p>{{message || 'TADAA-AM!'}}</p>
      </div>
      <div class="modal_foot">
        <button type="button" class="btn btn-primary" (click)="close()">OK</button>
      </div>
    </div>
  `
})
export class AlertComponent extends SimpleModalComponent<AlertModel, null> implements AlertModel {
  title: string;
  message: string;
  constructor() {
    super();
  }
}
