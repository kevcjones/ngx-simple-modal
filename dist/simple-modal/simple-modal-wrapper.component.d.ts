import { ComponentFactoryResolver, OnDestroy, Type, ViewContainerRef } from '@angular/core';
import { SimpleModalComponent } from './simple-modal.component';
export declare class SimpleModalWrapperComponent implements OnDestroy {
    private resolver;
    viewContainer: ViewContainerRef;
    wrapper: any;
    content: SimpleModalComponent<any, any>;
    clickOutsideCallback: () => void;
    constructor(resolver: ComponentFactoryResolver);
    addComponent<T, T1>(component: Type<SimpleModalComponent<T, T1>>): SimpleModalComponent<any, any>;
    onClickOutsideModalContent(contentClass: string | boolean, callback: () => void): void;
    private stopEventPropagation(event);
    ngOnDestroy(): void;
}
