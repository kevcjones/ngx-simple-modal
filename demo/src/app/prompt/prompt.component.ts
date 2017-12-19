import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface PromptModel {
  title:string;
  question:string;
}

@Component({
  selector: 'prompt',
  template: `
    <div class="modal_box">
      <div class="modal_head">
        <h4>{{title || 'Prompt'}}</h4>
      </div>
      <div class="modal_body">
        <label>{{question}}</label>
        <input type="text" class="form-control" [(ngModel)]="message" name="name" />
      </div>
      <div class="modal_foot">
        <button type="button" class="btn btn-outline-danger" (click)="close()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="apply()">Confirm</button>
      </div>
    </div>
  `
})
export class PromptComponent extends SimpleModalComponent<PromptModel, string> implements PromptModel {
  title: string;
  question: string;
  message: string = '';
  constructor() {
    super();
  }
  apply() {
    this.result = this.message;
    this.close();
  }
}
