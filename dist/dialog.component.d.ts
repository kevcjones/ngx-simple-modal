import { ElementRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
export declare class DialogComponent<T, T1> implements OnDestroy {
    private observer;
    protected result: T1;
    wrapper: ElementRef;
    closerCallback: (component) => void;
    constructor();
    fillData(data: T): Observable<T1>;
    close(): void;
    ngOnDestroy(): void;
}
