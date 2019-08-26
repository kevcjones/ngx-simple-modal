import { Component } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';
import { ParentDialogModalComponent } from './parent-dialog/parent-dialog.component';
import { AlertSelectComponent } from './alert-select/alert-select.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  confirmResult = null;
  promptMessage = '';

  constructor(private simpleModalService: SimpleModalService) {}

  showAlert() {
    this.simpleModalService.addModal(AlertComponent, {
      title: 'Alert title!',
      message: 'Alert message!!!',
    });
  }

  showAlertWithSelect() {
    this.simpleModalService.addModal(
      AlertSelectComponent,
      {
        title: 'Alert title!',
        message: 'Alert message!!!',
      },
      {
        autoFocus: true,
      }
    );
  }

  showAlertWithSelectPlusBClick() {
    this.simpleModalService.addModal(
      AlertSelectComponent,
      { title: 'Alert title!', message: 'Alert message!!!' },
      { closeOnClickOutside: true }
    );
  }

  showConfirm() {
    this.simpleModalService
      .addModal(ConfirmComponent, {
        title: 'Confirmation',
        message: 'Bla bla confirm some action?',
      })
      .subscribe(isConfirmed => {
        // Get modal result
        this.confirmResult = isConfirmed;
      });
  }

  showPrompt() {
    this.simpleModalService
      .addModal(PromptComponent, {
        title: 'Name dialog',
        question: 'What is your name?: ',
      })
      .subscribe(message => {
        // We get modal result
        this.promptMessage = message;
      });
  }

  showAlertWithClickOutside() {
    this.simpleModalService.addModal(
      AlertComponent,
      { message: 'Click outside to close dialog' },
      { closeOnClickOutside: true }
    );
  }

  showAlertWithCloseByEscapeKey() {
    this.simpleModalService.addModal(
      AlertComponent,
      { message: 'Dialog with close using escape' },
      { closeOnEscape: true }
    );
  }

  showAlertThatThrowsError() {
    throw new Error('Shown via custom error handler');
  }

  showParentDialog() {
    this.simpleModalService.addModal(ParentDialogModalComponent);
  }
}
