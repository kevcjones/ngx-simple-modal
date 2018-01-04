import { ErrorHandler, Injectable, Injector, isDevMode } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';

import { AlertComponent } from '../alert/alert.component';


@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error) {
        const modalService = this.injector.get(SimpleModalService);
        const message = error.message ? error.message : error.toString();

        if (isDevMode()) {
            console.error('Custom error : '+error);
        }
        return modalService.addModal(AlertComponent, {
            title: 'An error occurred',
            message: message,
        });

        
  }
}