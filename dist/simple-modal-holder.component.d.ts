import { ComponentFactoryResolver, Type, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SimpleModalOptions } from './simple-modal-options';
import { SimpleModalComponent } from './simple-modal.component';
export declare class SimpleModalHolderComponent {
    private resolver;
    viewContainer: ViewContainerRef;
    modals: Array<SimpleModalComponent<any, any>>;
    constructor(resolver: ComponentFactoryResolver);
    addModal<T, T1>(component: Type<SimpleModalComponent<T, T1>>, data?: T, options?: SimpleModalOptions): Observable<T1>;
    removeModal(closingModal: SimpleModalComponent<any, any>): Promise<any>;
    removeAllModals(): Promise<any>;
    private toggleBodyClass(bodyClass);
    private configureCloseOnClickOutside(modalWrapper);
    private toggleWrapperClass(modalWrapperEl, wrapperClass);
    private wait(ms?);
    private onOpening(onModalOpened);
    private _removeElement(component);
}
