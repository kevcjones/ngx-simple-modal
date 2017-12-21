import { ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SimpleModalOptions } from './simple-modal-options';
export declare abstract class SimpleModalComponent<T, T1> implements OnDestroy {
    private observer;
    protected result: T1;
    wrapper: ElementRef;
    options: SimpleModalOptions;
    private closerCallback;
    constructor();
    mapDataObject(data: T): void;
    setupObserver(): Observable<T1>;
    onClosing(callback: (component) => Promise<any>): void;
    close(): Promise<any>;
    private onKeydownHandler(evt);
    ngOnDestroy(): void;
}
