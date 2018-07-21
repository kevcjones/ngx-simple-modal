import { Component } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';

import { ConfirmComponent } from '../confirm/confirm.component';


@Component({
  selector: 'parent-modal',
  template: `
    <div class="modal-content modal-content-size-m">
      <div class="modal-header">
        <h4>Parent dialog</h4>
      </div>
      <div class="modal-body">
        <p>bla-bla</p>
        <p>bla-bla</p>
        <p>bla-bla</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="confirm()">Close</button>
      </div>
    </div>
  `
})
export class ParentDialogModalComponent extends SimpleModalComponent<null, null>  {

  constructor(private simpleModalService: SimpleModalService) {
    super();
  }

  confirm() {
    this.simpleModalService.addModal(ConfirmComponent, {
      title: 'Confirm',
      message: 'Are you sure you want close dialog?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.close();
      }
    });
  }
}
