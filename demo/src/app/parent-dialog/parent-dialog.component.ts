import { Component } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';

import { ConfirmComponent } from '../confirm/confirm.component';


@Component({
  selector: 'parent-modal',
  template: `
    <div class="modal_box modal_box-size-m">
      <div class="modal_head">
        <h4>Parent dialog</h4>
      </div>
      <div class="modal_body">
        <p>bla-bla</p>
        <p>bla-bla</p>
        <p>bla-bla</p>
      </div>
      <div class="modal_foot">
        <button type="button" class="btn btn-primary" (click)="confirm()">Close</button>
      </div>
    </div>
  `
})
export class ParentDialogModalComponent extends SimpleModalComponent<null, null>  {

  constructor(private SimpleModalService: SimpleModalService) {
    super();
  }

  confirm() {
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Confirm',
      message: 'Are you sure you want close dialog?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.close();
      }
    });
  }
}
