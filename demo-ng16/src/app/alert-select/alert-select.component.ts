import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { IOption, OptionService } from './options.service';


export interface AlertSelectModel {
  title: string;
  message: string;
}

@Component({
  selector: 'alert-select',
  template: `
  <div class="modal-content">
    <div class="modal-header">
      <h4>{{title || 'Alert!'}}</h4>
    </div>
    <div class="modal-body">
      <h2>this select didn't close on selection</h2>
      <p>
        Selected option: {{selectedCharacter}}
        <select [(ngModel)]="selectedCharacter">
          <option *ngFor="let option of characters" [value]="option.value">{{ option.label }}</option>
        </select>
        <button (click)="selectedCharacter='1'">
          Select Art3mis
        </button>
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="close()">OK</button>
    </div>
  </div>
  `
})
export class AlertSelectComponent extends SimpleModalComponent<AlertSelectModel, null> implements AlertSelectModel {
  title: string;
  message: string;

  characters: Array<IOption> = this.optionService.getCharacters();
  selectedCharacter = '3';

  constructor(private readonly optionService: OptionService) {
    super();
  }
}
