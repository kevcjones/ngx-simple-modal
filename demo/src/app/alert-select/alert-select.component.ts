import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { OptionService } from './options.service';
import { IOption } from 'ng-select';


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
      <h2>this ng-select didn't close on selection</h2>
      <p>
        Selected option: {{selectedCharacter}}
        <ng-select [options]="characters" [(ngModel)]="selectedCharacter">
        </ng-select>
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
