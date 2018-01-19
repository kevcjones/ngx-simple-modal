import { ErrorHandler, Injectable, Injector, isDevMode, ApplicationRef } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';

import { AlertComponent } from '../alert/alert.component';


@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error) {
        const modalService = this.injector.get(SimpleModalService);
        const appRef = this.injector.get(ApplicationRef);
        const message = error.message ? error.message : error.toString();

        if (isDevMode()) {
            console.error('Custom error : ' + error);
        }

        modalService.addModal(AlertComponent, {
            title: 'An error occurred',
            message: message,
        });

        // ng5 error handler does not trigger change detection so we have to do this
        setTimeout(() => appRef.tick(), 0);
  }
}
