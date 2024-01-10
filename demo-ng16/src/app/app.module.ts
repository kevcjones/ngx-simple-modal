import { A11yModule } from '@angular/cdk/a11y';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { defaultSimpleModalOptions, SimpleModalModule } from 'ngx-simple-modal';
import { AlertSelectComponent } from './alert-select/alert-select.component';
import { OptionService } from './alert-select/options.service';
import { AlertComponent } from './alert/alert.component';
import { AppComponent } from './app.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CustomErrorHandler } from './custom-error/custom-error-handler';
import { ParentDialogModalComponent } from './parent-dialog/parent-dialog.component';
import { PromptComponent } from './prompt/prompt.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    A11yModule,
    SimpleModalModule.forRoot(
      { container: 'modal-container' },
      {
        ...defaultSimpleModalOptions,
        ...{
          closeOnEscape: false,
          closeOnClickOutside: false,
          animationDuration: 0,
          autoFocus: true,
          draggable: false
        },
      }
    ),
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
    OptionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
