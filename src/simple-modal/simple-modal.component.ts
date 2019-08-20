import { ElementRef, HostListener, OnDestroy } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { SimpleModalOptions } from './simple-modal-options';

export interface OnDestroyLike {
  ngOnDestroy(): void;
  [key: string]: any;
}

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
  result: T1;

  /**
   * Dialog wrapper (modal placeholder)
   */
  wrapper: ElementRef;

  /**
   * ref of options for this component
   */
  options: SimpleModalOptions;

  /**
   * Callback to the holders close function
   */
  private closerCallback: (component) => Promise<any>;

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Maps your object passed in the creation to fields in your own Dialog classes
   * @param {T} data
   */
  mapDataObject(data: T): void {
    data = data || <T>{};
    const keys = Object.keys(data);
    for (let i = 0, length = keys.length; i < length; i++) {
      const key = keys[i];
      this[key] = data[key];
    }
  }

  /**
   * Setup observer
   * @return {Observable<T1>}
   */
  setupObserver(): Observable<T1> {
    return Observable.create((observer) => {
      this.observer = observer;

      this.completeOnDestroy(this);

      // called if observable is unsubscribed to
      return () => {
        this.close();
      };
    });
  }


  /**
   * Defines what happens when close is called - default this
   * will just call the default remove modal process. If overriden
   * must include
   * @param callback
   */
  onClosing(callback: ((component: SimpleModalComponent<any, any>) => Promise<any>)): void {
    this.closerCallback = callback;
  }

  /**
   * Closes modal
   */
  close(): Promise<any> {
    return this.closerCallback(this);
  }

  /**
   * keypress binding ngx way
   * @param evt
   */
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(evt: KeyboardEvent) {
    if (this.options && this.options.closeOnEscape) {
      this.close();
    }
  }

  /**
   * wrap the ngOnDestroy safely so that implementers can make their own
   * destroy functions safely.
   * @param component
   */
  private completeOnDestroy( component: OnDestroyLike) {
    const ngDestroyOriginal = component.ngOnDestroy;
    component.ngOnDestroy = () => {
      if (ngDestroyOriginal) {
        ngDestroyOriginal.apply(component);
      }
      if (this.observer) {
        this.observer.next(this.result);
        this.observer.complete();
      }
    };
  }

  ngOnDestroy() {
    // empty but needed
  }
}
