import { ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { SimpleModalWrapperComponent } from './simple-modal-wrapper.component';
import { SimpleModalService } from './simple-modal.service';

/**
 * Abstract modal
 * @template T - modal data;
 * @template T1 - modal result
 */
export abstract class SimpleModalComponent<T, T1> implements OnDestroy {

  /**
   * Observer to return result from modal
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
   * @param {SimpleModalService} SimpleModalService - instance of SimpleModalService
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
   * Closes modal
   */
  close(): void {
    if (!!this.closerCallback) {
      this.closerCallback(this);
    }
  }

  /**
   * Defines what happens when close is called - default this
   * will just call the default remove modal process
   * @param callback
   */
  onClose(callback: (component) => void): void {
    this.closerCallback = callback;
  }

  /**
   * OnDestroy handler
   * Sends modal result to observer
   */
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.next(this.result);
    }
  }
}
