import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'confirm',
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <h4>{{title || 'Confirm'}}</h4>
      </div>
      <div class="modal-body">
        <p>{{message || 'Are you sure?'}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger" (click)="cancel()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
      </div>
    </div>
  `
})
export class ConfirmComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  constructor() {
    super();
  }
  confirm() {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }
}
