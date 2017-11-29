import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SimpleModalModule } from 'ngx-simple-modal';

import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from "./confirm/confirm.component";
import { PromptComponent } from "./prompt/prompt.component";
import { ParentDialogModalComponent } from "./parent-dialog/parent-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ConfirmComponent,
    PromptComponent,
    ParentDialogModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SimpleModalModule
  ],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
    PromptComponent,
    ParentDialogModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
