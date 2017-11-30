import { Component } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';
import { ParentDialogModalComponent } from './parent-dialog/parent-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  confirmResult = null;
  promptMessage = '';

  constructor(private SimpleModalService: SimpleModalService) {}

  showAlert() {
    this.SimpleModalService.addModal(AlertComponent, {title: 'Alert title!', message: 'Alert message!!!'});
  }

  showConfirm() {
    this.SimpleModalService.addModal(ConfirmComponent, {
      title: 'Confirmation',
      message: 'Bla bla confirm some action?'})
      .subscribe((isConfirmed) => {
        // Get modal result
        this.confirmResult = isConfirmed;
    });
  }

  showPrompt() {
    this.SimpleModalService.addModal(PromptComponent, {
      title: 'Name dialog',
      question: 'What is your name?: '})
      .subscribe((message) => {
        // We get modal result
        this.promptMessage = message;
      });
  }

  showAlert2() {
    this.SimpleModalService.addModal(AlertComponent, { message: 'Click outside to close dialog' }, { closeOnClickOutside: true });
  }

  showAlert3() {
    this.SimpleModalService.addModal(AlertComponent, { message: 'Dialog with close using escape' }, { closeOnEscape: true});
  }
  showParentDialog() {
    this.SimpleModalService.addModal(ParentDialogModalComponent);
  }
}
