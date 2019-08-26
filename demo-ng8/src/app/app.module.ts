import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SimpleModalModule, SimpleModalOptions } from 'ngx-simple-modal';
import { SelectModule } from 'ng-select';

import { AppComponent } from './app.component';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';
import { ParentDialogModalComponent } from './parent-dialog/parent-dialog.component';
import { CustomErrorHandler } from './custom-error/custom-error-handler';
import { OptionService } from './alert-select/options.service';
import { AlertSelectComponent } from './alert-select/alert-select.component';
import {
  DefaultSimpleModalOptionConfig,
  defaultSimpleModalOptions,
} from 'ngx-simple-modal/simple-modal/simple-modal-options';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SelectModule,
    SimpleModalModule.forRoot({ container: 'modal-container' }),
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    AlertSelectComponent,
    ConfirmComponent,
    PromptComponent,
    ParentDialogModalComponent,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler,
    },
    // {
    //   provide: DefaultSimpleModalOptionConfig,
    //   useValue: {...defaultSimpleModalOptions, ...{ closeOnEscape: true, closeOnClickOutside: true }}
    // },
    OptionService,
  ],
  entryComponents: [
    AlertComponent,
    AlertSelectComponent,
    ConfirmComponent,
    PromptComponent,
    ParentDialogModalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
