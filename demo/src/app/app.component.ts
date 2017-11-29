import { Component } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { AlertComponent } from "./alert/alert.component";
import { ConfirmComponent } from "./confirm/confirm.component";
import { PromptComponent } from "./prompt/prompt.component";
import { ParentSimpleModalComponent } from "./parent-dialog/parent-dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  confirmResult:boolean = null;
  promptMessage:string = '';

  constructor(private SimpleModalService:SimpleModalService) {}

  showAlert() {
    this.SimpleModalService.addDialog(AlertComponent, {title:'Alert title!', message:'Alert message!!!'});
  }

  showConfirm() {
    this.SimpleModalService.addDialog(ConfirmComponent, {
      title:'Confirmation',
      message:'Bla bla confirm some action?'})
      .subscribe((isConfirmed)=>{
        //Get dialog result
        this.confirmResult = isConfirmed;
    });
  }

  showPrompt() {
    this.SimpleModalService.addDialog(PromptComponent, {
      title:'Name dialog',
      question:'What is your name?: '})
      .subscribe((message)=>{
        //We get dialog result
        this.promptMessage = message;
      });
  }

  showAlert2() {
    this.SimpleModalService.addDialog(AlertComponent, { message:'Click outside to close dialog' }, { closeByClickingOutside:true });
  }

  showAlert3() {
    this.SimpleModalService.addDialog(AlertComponent, { message:'Wait 5 seconds and dialog will be closed automatically' }, { autoCloseTimeout:5000 });
  }

  showAlert4() {
    this.SimpleModalService.addDialog(AlertComponent, { message:'Dialog with red backdrop' }, { backdropColor: 'rgba(255, 0, 0, 0.5)' });
  }
  showParentDialog() {
    this.SimpleModalService.addDialog(ParentSimpleModalComponent);
  }
}
