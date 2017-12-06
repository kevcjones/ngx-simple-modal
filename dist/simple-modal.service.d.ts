import { ApplicationRef, ComponentFactoryResolver, Injector, Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SimpleModalComponent } from './simple-modal.component';
import { SimpleModalOptions } from './simple-modal-options';
export declare class SimpleModalServiceConfig {
    container: HTMLElement | PromiseLike<HTMLElement>;
}
export declare class SimpleModalService {
    private resolver;
    private applicationRef;
    private injector;
    private modalHolderComponent;
    private container;
    constructor(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector, config: SimpleModalServiceConfig);
    addModal<T, T1>(component: Type<SimpleModalComponent<T, T1>>, data?: T, options?: SimpleModalOptions): Observable<T1>;
    removeModal(component: SimpleModalComponent<any, any>): Promise<{}>;
    removeAll(): Promise<{}>;
    private createSimpleModalHolder();
}
