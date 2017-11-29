import { ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { DialogWrapperComponent } from './dialog-wrapper.component';
import { DialogService } from './dialog.service';

/**
 * Abstract dialog
 * @template T - dialog data;
 * @template T1 - dialog result
 */
export abstract class DialogComponent<T, T1> implements OnDestroy {

  /**
   * Observer to return result from dialog
   */
  private observer: Observer<T1>;

  /**
   * Dialog result
   * @type {T1}
   */
  protected result: T1;

  /**
   * Dialog wrapper (modal placeholder)
   */
  wrapper: ElementRef;

  /**
   * Callback to the holders close function
   */
  private closerCallback: (component) => void;

  /**
   * Constructor
   * @param {DialogService} dialogService - instance of DialogService
   */
  constructor() {}

  /**
   * Maps your object passed in the creation to fields in your own Dialog classes
   * @param {T} data
   * @return {Observable<T1>}
   */
  fillData(data: T): Observable<T1> {
    data = data || <T>{};
    const keys = Object.keys(data);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      this[key] = data[key];
    }
    return Observable.create((observer) => {
      this.observer = observer;
      return () => {
        this.close();
      };
    });
  }

  /**
   * Closes dialog
   */
  close(): void {
    if (!!this.closerCallback) {
      this.closerCallback(this);
    }
  }

  /**
   * Defines what happens when close is called - default this
   * will just call the default remove dialog process
   * @param callback
   */
  onClose(callback: (component) => void): void {
    this.closerCallback = callback;
  }

  /**
   * OnDestroy handler
   * Sends dialog result to observer
   */
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.next(this.result);
    }
  }
}
