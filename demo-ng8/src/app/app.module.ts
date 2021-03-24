import { A11yModule } from '@angular/cdk/a11y';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SelectModule } from 'ng-select';
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
    HttpModule,
    SelectModule,
    A11yModule,
    SimpleModalModule.forRoot(
      { container: 'modal-container' },
      {
        ...defaultSimpleModalOptions,
        ...{
          closeOnEscape: true,
          closeOnClickOutside: true,
          animationDuration: 0,
          autoFocus: true,
          draggable: true
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
